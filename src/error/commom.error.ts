import { MidwayError, registerErrorCode } from '@midwayjs/core';

export const CommonErrorEnum = registerErrorCode('common', {
  /** 成功/正确执行 */
  SUCCESS: '00000',
  /** 未知错误 */
  UNKNOWN: '00001',
} as const);

export class UnknownError extends MidwayError {
  constructor(message?: string) {
    super(message ?? '未知错误', CommonErrorEnum.UNKNOWN);
  }
}
