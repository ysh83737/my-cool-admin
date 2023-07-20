import { Context } from 'koa';

const PATHS = ['/login', '/captcha'];
/**
 * 中间件忽略登录相关无需验证的接口
 */
export class IgnoreLogin {
  ignore(ctx: Context) {
    return PATHS.includes(ctx.path);
  }
}
