/**
 * 注册[B类]错误码
 * 错误来源于当前系统，往往是业务逻辑出错，或程序健壮性差等问题
 */
import { MidwayError, registerErrorCode } from '@midwayjs/core';
import { B_BUSINESS_ERROR } from '../constants/responseCode';

export const BusinessErrorEnum = registerErrorCode(
  'business',
  B_BUSINESS_ERROR
);

export class ExecuteError extends MidwayError {
  constructor(message?: string) {
    super(message ?? '系统执行出错', BusinessErrorEnum.EXECUTE_ERROR);
  }
}
export class ExecuteTimeoutError extends MidwayError {
  constructor(message?: string) {
    super(message ?? '系统执行超时', BusinessErrorEnum.EXECUTE_TIMEOUT);
  }
}
