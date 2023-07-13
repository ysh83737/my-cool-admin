import { Controller, Get } from '@midwayjs/core';
import { ApiTags } from '@midwayjs/swagger';

@ApiTags('调试接口')
@Controller('/')
export class HomeController {
  @Get('/')
  async home(): Promise<string> {
    return 'Hello Midwayjs!';
  }
}
