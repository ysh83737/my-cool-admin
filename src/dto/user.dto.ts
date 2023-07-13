import { ApiProperty } from '@midwayjs/swagger';
import { Rule, RuleType } from '@midwayjs/validate';
import { ParamEmptyError } from '../error/user.error';
import { ResponseDTO } from './common.dto';
import { User } from '../entity/user.entity';

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

export class UserInfoResponse extends ResponseDTO {
  @ApiProperty({
    description: '用户信息',
    type: User,
  })
  data: User;
}
