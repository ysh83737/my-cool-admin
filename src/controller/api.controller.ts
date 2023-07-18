import { Inject, Controller } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { ApiTags } from '@midwayjs/swagger';

@ApiTags('业务API')
@Controller('/api')
export class APIController {
  @Inject()
  ctx: Context;
}
