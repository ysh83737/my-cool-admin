import { Inject, Controller, Get, Post, Body } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { UserService } from '../service/user.service';
import { UpdatePasswordDTO } from '../dto/user.dto';
import { ApiResponse, ApiOperation, ApiTags } from '@midwayjs/swagger';
import { ResponseDTO } from '../dto/common.dto';

@ApiTags('业务API')
@Controller('/api')
export class APIController {
  @Inject()
  ctx: Context;

  @Inject()
  userService: UserService;

  @Get('/getUserInfo')
  async getUser() {
    const user = await this.userService.getUser();
    return user;
  }

  @ApiOperation({
    summary: '修改用户密码',
    description: '作者：袁绍宏',
  })
  @Post('/updatePassword')
  @ApiResponse({
    type: ResponseDTO,
  })
  async updatePassword(@Body() body: UpdatePasswordDTO) {
    return await this.userService.updatePassword(body);
  }
}
