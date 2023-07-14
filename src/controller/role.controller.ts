import { Body, Controller, Inject, Post } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { ApiOperation, ApiResponse, ApiTags } from '@midwayjs/swagger';
import { RoleListFilter, RoleListResponse } from '../dto/role.dto';
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
}
