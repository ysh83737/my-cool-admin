import { Catch, MidwayError } from '@midwayjs/core';
import { MidwayValidationError } from '@midwayjs/validate';

/**
 * 处理参数校验类型的错误，使其返回系统的错误码（而非框架错误码）
 */
@Catch(MidwayValidationError)
export class ValidateErrorFilter {
  async catch(err: MidwayValidationError) {
    const { cause } = err;
    let code = err.code;
    if (cause instanceof MidwayError) {
      code = cause.code;
    }
    return {
      code,
      message: err.message,
      data: null,
    };
  }
}
