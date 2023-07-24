import {
  Body,
  Controller,
  Del,
  Get,
  Inject,
  Param,
  Post,
} from '@midwayjs/core';
import {
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@midwayjs/swagger';
import { Context } from '@midwayjs/koa';
import { ResponseEmptyDTO } from '../dto/common.dto';
import {
  AddUserBody,
  AddUserResponse,
  ChangePasswordBody,
  ChangeStatusBody,
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
  @ApiParam({
    name: 'id',
    description: '用户id',
    type: 'integer',
    example: 1,
  })
  @Del('/delete/:id')
  async DeleteUserBody(@Param() id: number) {
    await this.userService.deleteUser(id);
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
    summary: '修改当前用户密码',
  })
  @ApiResponse({
    type: ResponseEmptyDTO,
  })
  @Post('/password')
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

  @ApiOperation({
    summary: '获取当前用户信息',
  })
  @ApiResponse({
    type: UserInfoResponse,
  })
  @Get('/getUserInfo')
  async getUserInfo() {
    const user = await this.userService.getUserInfo();
    return user;
  }
}
