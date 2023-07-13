import { Inject, Provide } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { JwtService } from '@midwayjs/jwt';
import { Repository } from 'typeorm';
import * as md5 from 'md5';
import { User } from '../entity/user.entity';
import { LoginDTO } from '../dto/login.dto';
import { USER_STATUS, UserJwtPayload } from '../interface/user.interface';
import {
  UserFrozenError,
  UserNotExistError,
  UserPasswordError,
} from '../error/user.error';

@Provide()
export class LoginService {
  @InjectEntityModel(User)
  userEntity: Repository<User>;

  @Inject()
  jwtService: JwtService;

  @Inject()
  ctx: Context;

  async login(login: LoginDTO) {
    const { userName, password } = login;
    const user = await this.userEntity
      .createQueryBuilder('user')
      .where(`user.userName="${userName}"`)
      .addSelect(['user.password', 'user.pwVersion'])
      .getOne();
    if (!user) {
      throw new UserNotExistError();
    }
    if (user.status === USER_STATUS.DISABLED) {
      throw new UserFrozenError('用户账户为禁用状态，无法登录');
    }
    if (user.password !== md5(password)) {
      throw new UserPasswordError();
    }
    const token = await this.getToken(user);
    this.ctx.cookies.set('token', token);
    return token;
  }

  async getToken(user: User) {
    const { id, userName, pwVersion } = user;
    const payload: UserJwtPayload = { id, userName, pwVersion };
    return this.jwtService.sign(payload);
  }

  logout() {
    this.ctx.cookies.set('token', '');
  }
}
