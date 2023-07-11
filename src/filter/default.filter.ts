import { Catch, MidwayError } from '@midwayjs/core';
import { RESPONSE_CODE } from '../constants/responseCode';

@Catch()
export class DefaultErrorFilter {
  async catch(err: Error | MidwayError) {
    let code = RESPONSE_CODE.UNKNOWN as string;
    if (err instanceof MidwayError) {
      code = err.code as string;
    }
    return {
      code,
      message: err.message,
      data: null,
    };
  }
}
