import {
  Body,
  Controller,
  Del,
  Get,
  Inject,
  Param,
  Post,
} from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import {
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@midwayjs/swagger';
import {
  AddRoleBody,
  AddRoleResponse,
  ChangeAuthority,
  ChangeStatus,
  EditRoleBody,
  RoleAuthorityResponse,
  RoleListFilter,
  RoleListResponse,
} from '../dto/role.dto';
import { ResponseEmptyDTO } from '../dto/common.dto';
import { RoleService } from '../service/role.service';
import { RuleType, Valid } from '@midwayjs/validate';

@ApiTags('角色相关')
@Controller('/role')
export class RoleController {
  @Inject()
  ctx: Context;

  @Inject()
  roleService: RoleService;

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
    summary: '删除角色',
  })
  @ApiResponse({
    type: ResponseEmptyDTO,
  })
  @ApiParam({
    name: 'id',
    description: '角色id',
    type: 'integer',
    example: 1,
  })
  @Del('/delete/:id')
  async DeleteRole(@Param('id') id: number) {
    await this.roleService.deleteRole(id);
    return '';
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

  @ApiOperation({
    summary: '修改角色权限',
  })
  @ApiResponse({
    type: ResponseEmptyDTO,
  })
  @Post('/authority')
  async changeAuthority(@Body() body: ChangeAuthority) {
    await this.roleService.changeAuthority(body);
    return '';
  }

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
    summary: '获取角色的权限',
  })
  @ApiResponse({
    type: RoleAuthorityResponse,
  })
  @ApiParam({
    name: 'id',
    description: '角色id',
    example: 1,
    type: 'integer',
  })
  @Get('/authority/:id')
  async roleAuthority(
    @Valid(RuleType.number().label('角色id').integer().required().min(1))
    @Param('id')
    id: number
  ) {
    return await this.roleService.roleAuthority(id);
  }
}
