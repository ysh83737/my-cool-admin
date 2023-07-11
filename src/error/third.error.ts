/**
 * 注册[C类]错误码
 * 错误来源于第三方服务，比如 CDN 服务出错，消息投递超时等问题
 */
import { MidwayError } from '@midwayjs/core';
import { C_3RD_ERROR } from '../constants/responseCode';

export class Call3rdError extends MidwayError {
  constructor(message?: string) {
    super(message ?? '调用第三方服务出错', C_3RD_ERROR.CALL_3RD_ERROR);
  }
}
export class MiddleError extends MidwayError {
  constructor(message?: string) {
    super(message ?? '中间件服务出错', C_3RD_ERROR.MIDDLE_ERROR);
  }
}
