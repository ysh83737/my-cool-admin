import { Inject, Middleware, httpError } from '@midwayjs/core';
import { Context, NextFunction } from '@midwayjs/koa';
import { JwtService } from '@midwayjs/jwt';

@Middleware()
export class JwtMiddleware {
  @Inject()
  jwtService: JwtService;

  public static getName() {
    return 'jwt';
  }

  resolve() {
    return async (ctx: Context, next: NextFunction) => {
      const token = ctx.cookies.get('token');
      if (!token) {
        throw new httpError.UnauthorizedError('无Token');
      }

      try {
        await this.jwtService.verify(token, { complete: true });
      } catch (error) {
        throw new httpError.UnauthorizedError('Token失效');
      }
      await next();
    };
  }

  public match(ctx: Context) {
    return !ctx.path.includes('/login');
  }
}
