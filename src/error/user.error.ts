/**
 * 注册[A类]错误码
 * 错误来源于用户，比如参数错误，用户安装版本过低，用户支付超时等问题
 */
import { MidwayError, registerErrorCode } from '@midwayjs/core';
import { A_USER_ERROR } from '../constants/responseCode';

export const UserErrorEnum = registerErrorCode('user', A_USER_ERROR);

export class UserClientError extends MidwayError {
  constructor(message?: string) {
    super(message ?? '用户端错误', UserErrorEnum.USER_CLIENT_ERROR);
  }
}

export class RequestParamError extends MidwayError {
  constructor(message?: string) {
    super(message ?? '用户请求参数错误', UserErrorEnum.REQ_PARAM_ERROR);
  }
}

export class ParamEmptyError extends MidwayError {
  constructor(message?: string) {
    super(message ?? '请求必填参数为空', UserErrorEnum.PARAM_EMPTY);
  }
}
