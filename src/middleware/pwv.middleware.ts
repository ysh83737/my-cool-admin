import { Middleware } from '@midwayjs/core';
import { Context, NextFunction } from '@midwayjs/koa';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entity/user.entity';
import { PasswordInvalidError } from '../error/user.error';
import { IgnoreLogin } from './basic/IgnoreLogin';

/**
 * 控制用户密码版本，使密码修改后用户需要重新登陆
 */
@Middleware()
export class PwVersionMiddleware extends IgnoreLogin {
  @InjectEntityModel(User)
  userEntity: Repository<User>;

  async resolve() {
    return async (ctx: Context, next: NextFunction) => {
      const { id, pwVersion } = ctx.getAttr('user.jwt');
      const user = await this.userEntity
        .createQueryBuilder('user')
        .where(`user.id=${id}`)
        .select('user.pwVersion')
        .getOne();
      if (user.pwVersion !== pwVersion) {
        throw new PasswordInvalidError('用户密码已修改，请重新登录');
      }
      await next();
    };
  }
  public static getName() {
    return 'passwordVersion';
  }
}
