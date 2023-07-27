/**
 * 注册[C类]错误码
 * 错误来源于第三方服务，比如 CDN 服务出错，消息投递超时等问题
 */
import { MidwayError } from '@midwayjs/core';

export class Call3rdError extends MidwayError {
  constructor(message?: string) {
    super(message ?? '调用第三方服务出错', 'C0001');
  }
}
export class MiddleError extends MidwayError {
  constructor(message?: string) {
    super(message ?? '中间件服务出错', 'C0100');
  }
}
