import { Inject, Controller, Get, Post, Body } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { ApiResponse, ApiOperation, ApiTags } from '@midwayjs/swagger';
import { UserService } from '../service/user.service';
import { UpdatePasswordDTO, UserInfoResponse } from '../dto/user.dto';
import { ResponseDTO } from '../dto/common.dto';

@ApiTags('业务API')
@Controller('/api')
export class APIController {
  @Inject()
  ctx: Context;

  @Inject()
  userService: UserService;

  @Get('/getUserInfo')
  @ApiOperation({
    summary: '获取当前用户信息',
  })
  @ApiResponse({
    type: UserInfoResponse,
  })
  async getUser() {
    const user = await this.userService.getUser();
    return user;
  }

  @Post('/updatePassword')
  @ApiOperation({
    summary: '修改用户密码',
    description: '作者：Shawn',
  })
  @ApiResponse({
    type: ResponseDTO,
  })
  async updatePassword(@Body() body: UpdatePasswordDTO) {
    return await this.userService.updatePassword(body);
  }
}
