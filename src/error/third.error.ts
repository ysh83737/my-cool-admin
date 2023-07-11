/**
 * 注册[C类]错误码
 * 错误来源于第三方服务，比如 CDN 服务出错，消息投递超时等问题
 */
import { MidwayError, registerErrorCode } from '@midwayjs/core';
import { C_3RD_ERROR } from '../constants/responseCode';

export const ThirdPartyErrorEnum = registerErrorCode('third', C_3RD_ERROR);

export class Call3rdError extends MidwayError {
  constructor(message?: string) {
    super(message ?? '调用第三方服务出错', ThirdPartyErrorEnum.CALL_3RD_ERROR);
  }
}
export class MiddleError extends MidwayError {
  constructor(message?: string) {
    super(message ?? '中间件服务出错', ThirdPartyErrorEnum.MIDDLE_ERROR);
  }
}
