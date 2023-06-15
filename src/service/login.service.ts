import { Inject, Provide } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { JwtService } from '@midwayjs/jwt';
import { MidwayCommonError } from '@midwayjs/core/dist/error/framework';
import { Repository } from 'typeorm';
import * as md5 from 'md5';
import { User } from '../entity/user.entity';
import { LoginDTO } from '../dto/login.dto';
import { USER_STATUS } from '../interface/user.interface';

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
    const user = await this.userEntity.findOneBy({ userName });
    if (user) {
      if (user.status === USER_STATUS.DISABLED) {
        throw new MidwayCommonError('账号为禁用状态，无法登录');
      }
      if (user.password !== md5(password)) {
        throw new MidwayCommonError('密码错误');
      }
      const token = await this.getToken(user);
      this.ctx.cookies.set('token', token);
      return {
        user,
        token,
      };
    }
  }

  async getToken(user: User) {
    const { id, userName } = user;
    return this.jwtService.sign({ id, userName });
  }
}
