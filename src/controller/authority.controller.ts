import { Body, Controller, Inject, Post, Del, Param } from '@midwayjs/core';
import {
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@midwayjs/swagger';
import { RuleType, Valid } from '@midwayjs/validate';
import { AuthorityService } from '../service/authority.service';
import { ResponseEmptyDTO } from '../dto/common.dto';
import {
  AddAuthority,
  AddAuthorityResponse,
  AuthorityList,
  AuthorityListResponse,
} from '../dto/authority.dto';

@ApiTags('权限相关')
@Controller('/authority')
export class AuthorityController {
  @Inject()
  authorityService: AuthorityService;

  @ApiOperation({
    summary: '新增权限',
  })
  @ApiResponse({
    type: AddAuthorityResponse,
  })
  @Post('/add')
  async addAuthority(@Body() body: AddAuthority) {
    return await this.authorityService.addAuthority(body);
  }

  @ApiOperation({
    summary: '删除权限',
  })
  @ApiResponse({
    type: ResponseEmptyDTO,
  })
  @ApiParam({
    name: 'id',
    description: '权限id',
    example: 1,
    type: 'integer',
  })
  @Del('/delete/:id')
  async deleteAuthority(
    @Valid(RuleType.number().integer().required().min(1))
    @Param('id')
    id: number
  ) {
    await this.authorityService.deleteAuthority(id);
    return '';
  }

  @ApiOperation({
    summary: '权限列表（树）',
  })
  @ApiResponse({
    type: AuthorityListResponse,
  })
  @Post('/list')
  async authorityList(@Body() body: AuthorityList) {
    return await this.authorityService.authorityList(body);
  }
}
