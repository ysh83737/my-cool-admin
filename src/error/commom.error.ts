/**
 * 注册通用错误码
 */
import { MidwayError, registerErrorCode } from '@midwayjs/core';
import { COMMON_CODE } from '../constants/responseCode';

export const CommonErrorEnum = registerErrorCode('common', COMMON_CODE);

export class UnknownError extends MidwayError {
  constructor(message?: string) {
    super(message ?? '未知错误', CommonErrorEnum.UNKNOWN);
  }
}
