import { Context } from 'koa';
/**
 * 中间件忽略`/login`接口
 */
export class IgnoreLogin {
  ignore(ctx: Context) {
    return ctx.path === '/login';
  }
}
