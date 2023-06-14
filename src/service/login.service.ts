import { Provide } from '@midwayjs/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
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
      return '登录成功';
    }
  }
}
