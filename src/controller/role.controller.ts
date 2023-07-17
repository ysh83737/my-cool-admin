import { Body, Controller, Inject, Post } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { ApiOperation, ApiResponse, ApiTags } from '@midwayjs/swagger';
import {
  AddRoleBody,
  AddRoleResponse,
  ChangeStatus,
  EditRoleBody,
  RoleListFilter,
  RoleListResponse,
} from '../dto/role.dto';
import { ResponseEmptyDTO } from '../dto/common.dto';
import { RoleService } from '../service/role.service';

@ApiTags('角色相关')
@Controller('/role')
export class RoleController {
  @Inject()
  ctx: Context;

  @Inject()
  roleService: RoleService;

  @ApiOperation({
    summary: '角色列表',
  })
  @ApiResponse({
    type: RoleListResponse,
  })
  @Post('/list')
  async getRoleList(@Body() body: RoleListFilter) {
    return await this.roleService.getRoleList(body);
  }

  @ApiOperation({
    summary: '添加角色',
  })
  @ApiResponse({
    type: AddRoleResponse,
  })
  @Post('/add')
  async addRole(@Body() body: AddRoleBody) {
    return await this.roleService.addRole(body);
  }

  @ApiOperation({
    summary: '编辑角色',
  })
  @ApiResponse({
    type: ResponseEmptyDTO,
  })
  @Post('/edit')
  async editRole(@Body() body: EditRoleBody) {
    await this.roleService.editRole(body);
    return '';
  }

  @ApiOperation({
    summary: '修改角色状态',
  })
  @ApiResponse({
    type: ResponseEmptyDTO,
  })
  @Post('/status')
  async changeStatus(@Body() body: ChangeStatus) {
    await this.roleService.changeStatus(body);
    return '';
  }
}
