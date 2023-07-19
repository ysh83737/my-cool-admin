import { Body, Controller, Get, Inject, Post } from '@midwayjs/core';
import { ApiOperation, ApiResponse, ApiTags } from '@midwayjs/swagger';
import { Context } from '@midwayjs/koa';
import { ResponseEmptyDTO } from '../dto/common.dto';
import {
  AddUserBody,
  AddUserResponse,
  ChangePasswordBody,
  ChangeStatusBody,
  DeleteUserBody,
  EditUserBody,
  UserInfoResponse,
  UserListFilter,
  UserListResponse,
} from '../dto/user.dto';
import { UserService } from '../service/user.service';

@ApiTags('用户相关')
@Controller('/user')
export class UserController {
  @Inject()
  ctx: Context;

  @Inject()
  userService: UserService;

  @ApiOperation({
    summary: '增加用户',
  })
  @ApiResponse({
    type: AddUserResponse,
  })
  @Post('/add')
  async addUser(@Body() body: AddUserBody) {
    return await this.userService.addUser(body);
  }

  @ApiOperation({
    summary: '删除用户',
  })
  @ApiResponse({
    type: ResponseEmptyDTO,
  })
  @Post('/delete')
  async DeleteUserBody(@Body() body: DeleteUserBody) {
    await this.userService.deleteUser(body);
    return '';
  }

  @ApiOperation({
    summary: '修改用户状态',
  })
  @ApiResponse({
    type: ResponseEmptyDTO,
  })
  @Post('/status')
  async changeUserStatus(@Body() body: ChangeStatusBody) {
    await this.userService.changeUserStatus(body);
    return '';
  }

  @ApiOperation({
    summary: '修改用户信息',
  })
  @ApiResponse({
    type: ResponseEmptyDTO,
  })
  @Post('/edit')
  async editUser(@Body() body: EditUserBody) {
    await this.userService.editUser(body);
    return '';
  }

  @Post('/changePassword')
  @ApiOperation({
    summary: '修改当前用户密码',
  })
  @ApiResponse({
    type: ResponseEmptyDTO,
  })
  async changePassword(@Body() body: ChangePasswordBody) {
    await this.userService.changePassword(body);
    return '';
  }

  @ApiOperation({
    summary: '用户列表',
  })
  @ApiResponse({
    type: UserListResponse,
  })
  @Post('/list')
  async getUserList(@Body() body: UserListFilter) {
    return await this.userService.userList(body);
  }

  @Get('/getUserInfo')
  @ApiOperation({
    summary: '获取当前用户信息',
  })
  @ApiResponse({
    type: UserInfoResponse,
  })
  async getUserInfo() {
    const user = await this.userService.getUserInfo();
    return user;
  }
}
