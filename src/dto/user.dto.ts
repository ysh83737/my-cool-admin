import { ApiProperty } from '@midwayjs/swagger';
import { Rule, RuleType } from '@midwayjs/validate';
import { ParamEmptyError } from '../error/user.error';

export class UpdatePasswordDTO {
  @ApiProperty({
    required: true,
    description: '新密码（需经过md5加密传输）',
    format: 'password',
    example: '******',
  })
  @Rule(
    RuleType.string().required().error(new ParamEmptyError('新密码不能为空'))
  )
  password: string;
}
