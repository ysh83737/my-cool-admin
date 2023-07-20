import { IMiddleware, Middleware } from '@midwayjs/core';
import { Context, NextFunction } from '@midwayjs/koa';
import { RESPONSE_CODE } from '../constants/responseCode';

@Middleware()
export class ResponseMiddleware implements IMiddleware<Context, NextFunction> {
  resolve() {
    return async (ctx: Context, next: NextFunction) => {
      const data = await next();
      if (ctx.type === 'image/svg+xml') {
        return data;
      }
      return {
        code: RESPONSE_CODE.SUCCESS,
        data,
        message: '',
      };
    };
  }
  static getName() {
    return 'response';
  }
}
