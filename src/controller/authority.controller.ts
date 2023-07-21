import { Body, Controller, Inject, Post } from '@midwayjs/core';
import { ApiOperation, ApiResponse, ApiTags } from '@midwayjs/swagger';
import { AuthorityService } from '../service/authority.service';
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
