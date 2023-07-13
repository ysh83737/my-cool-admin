import { Body, Controller, Get, Inject, Post } from '@midwayjs/core';
import { ApiOperation, ApiResponse, ApiTags } from '@midwayjs/swagger';
import { LoginService } from '../service/login.service';
import { LoginDTO, LoginResponse } from '../dto/login.dto';
import { ResponseEmptyDTO } from '../dto/common.dto';

@ApiTags('登录相关')
@Controller()
export class LoginController {
  @Inject()
  loginService: LoginService;

  @Post('/login')
  @ApiOperation({
    summary: '用户登录',
  })
  @ApiResponse({
    description: '登录结果',
    type: LoginResponse,
  })
  async login(@Body() login: LoginDTO) {
    return await this.loginService.login(login);
  }

  @Get('/logout')
  @ApiOperation({
    summary: '登出',
  })
  @ApiResponse({
    type: ResponseEmptyDTO,
  })
  logout() {
    this.loginService.logout();
    return '';
  }
}
