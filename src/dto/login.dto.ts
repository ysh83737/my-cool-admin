import { ApiProperty } from '@midwayjs/swagger';
import { Rule, RuleType } from '@midwayjs/validate';

export class LoginDTO {
  @ApiProperty({
    description: '用户名',
    example: 'admin',
  })
  @Rule(RuleType.string().required())
  userName: string;

  @ApiProperty({
    description: '密码',
    example: '******',
  })
  @Rule(RuleType.string().required())
  password: string;
}

export class LoginResponse {
  @ApiProperty({
    description: '是否成功',
  })
  success: boolean;

  @ApiProperty({
    description: '消息',
    example: '登录成功',
  })
  message: string;
}
