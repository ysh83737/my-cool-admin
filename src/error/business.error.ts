/**
 * 注册[B类]错误码
 * 错误来源于当前系统，往往是业务逻辑出错，或程序健壮性差等问题
 */
import { MidwayError } from '@midwayjs/core';
import { B_BUSINESS_ERROR } from '../constants/responseCode';

export class ExecuteError extends MidwayError {
  constructor(message?: string) {
    super(message ?? '系统执行出错', B_BUSINESS_ERROR.EXECUTE_ERROR);
  }
}
export class ExecuteTimeoutError extends MidwayError {
  constructor(message?: string) {
    super(message ?? '系统执行超时', B_BUSINESS_ERROR.EXECUTE_TIMEOUT);
  }
}
