import { Catch, MidwayError } from '@midwayjs/core';
import { MidwayValidationError } from '@midwayjs/validate';
import { A_USER_ERROR } from '../constants/responseCode';

const MIDWAY_VALIDATE_CODE = /^VALIDATE_/;

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
    } else if (MIDWAY_VALIDATE_CODE.test(code as string)) {
      code = A_USER_ERROR.REQ_PARAM_ERROR;
    }
    return {
      code,
      message: err.message,
      data: null,
    };
  }
}
