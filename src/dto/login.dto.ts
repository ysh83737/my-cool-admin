import { ApiProperty } from '@midwayjs/swagger';
import { ResponseDTO } from './common.dto';
import { Rule, RuleType } from '@midwayjs/validate';
import { ParamEmptyError } from '../error/user.error';

export class LoginDTO {
  @ApiProperty({
    required: true,
    description: '用户名',
    example: 'admin',
  })
  @Rule(
    RuleType.string().required().error(new ParamEmptyError('用户名不能为空'))
  )
  userName: string;

  @ApiProperty({
    required: true,
    description: '密码',
    format: 'password',
    example: '******',
  })
  @Rule(RuleType.string().required().error(new ParamEmptyError('密码不能为空')))
  password: string;

  @ApiProperty({
    required: true,
    description: '验证码',
    example: 'xxxx',
  })
  @Rule(RuleType.string().label('验证码').required())
  captcha: string;
}
export class LoginResponse extends ResponseDTO {
  @ApiProperty({
    description: '用户token',
    example: 'xxxxxxxxxxxx',
  })
  data: string;
}
