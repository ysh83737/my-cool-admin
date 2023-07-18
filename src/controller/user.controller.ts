import { Body, Controller, Get, Inject, Post } from '@midwayjs/core';
import { ApiOperation, ApiResponse, ApiTags } from '@midwayjs/swagger';
import { Context } from '@midwayjs/koa';
import { ResponseEmptyDTO } from '../dto/common.dto';
import { ChangePasswordBody, UserInfoResponse } from '../dto/user.dto';
import { UserService } from '../service/user.service';

@ApiTags('用户相关')
@Controller('/user')
export class UserController {
  @Inject()
  ctx: Context;

  @Inject()
  userService: UserService;

  @Post('/updatePassword')
  @ApiOperation({
    summary: '修改用户密码',
  })
  @ApiResponse({
    type: ResponseEmptyDTO,
  })
  async updatePassword(@Body() body: ChangePasswordBody) {
    await this.userService.updatePassword(body);
    return '';
  }

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
}
