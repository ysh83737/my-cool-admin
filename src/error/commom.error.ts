/**
 * 注册通用错误码
 */
import { MidwayError } from '@midwayjs/core';
import { COMMON_CODE } from '../constants/responseCode';

export class UnknownError extends MidwayError {
  constructor(message?: string) {
    super(message ?? '未知错误', COMMON_CODE.UNKNOWN);
  }
}
