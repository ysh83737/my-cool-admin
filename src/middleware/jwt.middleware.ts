import { Inject, Middleware, httpError } from '@midwayjs/core';
import { Context, NextFunction } from '@midwayjs/koa';
import { JwtService } from '@midwayjs/jwt';
import { UserJwtPayload } from '../interface/user.interface';
import { IgnoreLogin } from './basic/IgnoreLogin';

@Middleware()
export class JwtMiddleware extends IgnoreLogin {
  @Inject()
  jwtService: JwtService;

  static getName() {
    return 'jwt';
  }

  resolve() {
    return async (ctx: Context, next: NextFunction) => {
      const token = ctx.cookies.get('token');
      if (!token) {
        throw new httpError.UnauthorizedError('无Token');
      }

      try {
        const jwt = await this.jwtService.verify(token, {
          complete: true,
        });
        if (typeof jwt !== 'string') {
          const payload = jwt.payload as UserJwtPayload;
          ctx.setAttr('user.jwt', payload);
        }
      } catch (error) {
        throw new httpError.UnauthorizedError('Token失效');
      }
      await next();
    };
  }
}
