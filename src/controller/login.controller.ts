import { Body, Controller, Inject, Post } from '@midwayjs/core';
import { ApiBody, ApiResponse } from '@midwayjs/swagger';
import { LoginService } from '../service/login.service';
import { LoginDTO, LoginResponse } from '../dto/login.dto';

@Controller()
export class LoginController {
  @Inject()
  loginService: LoginService;

  @Post('/login')
  @ApiBody({
    description: '用户登录',
  })
  @ApiResponse({
    description: '登录结果',
    type: LoginResponse,
  })
  async login(@Body() login: LoginDTO) {
    const result = await this.loginService.login(login);
    return {
      success: true,
      message: result,
    };
  }
}
