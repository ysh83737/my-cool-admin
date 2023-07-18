import { ApiProperty } from '@midwayjs/swagger';
import { Rule, RuleType } from '@midwayjs/validate';
import { ParamEmptyError } from '../error/user.error';
import { User, UserBase } from '../entity/user.entity';
import { USER_STATUS } from '../interface/user.interface';
import { Pager, ResponseDTO } from './common.dto';

/** 增加用户 */
export class AddUserBody extends UserBase {
  @Rule(RuleType.string().label('用户登录名').required().max(20))
  userName: string;

  @Rule(RuleType.string().label('用户昵称').required().max(20))
  nickName: string;

  @Rule(RuleType.string().label('姓名').required().max(20))
  name: string;

  @Rule(RuleType.string().label('用户头像').empty(''))
  avatarUrl: string;

  @Rule(RuleType.string().label('手机号').empty('').max(11))
  phone: string;

  @Rule(RuleType.string().email().label('邮箱').empty(''))
  email: string;

  @Rule(RuleType.string().label('备注').empty(''))
  remark: string;

  @ApiProperty({
    required: true,
    description: '角色id',
    type: 'integer',
    example: 1,
    minimum: 1,
  })
  @Rule(RuleType.number().integer().label('角色id').empty('').min(1))
  roleId: number;
}
export class AddUserResponse extends ResponseDTO {
  @ApiProperty({
    description: '用户id',
    example: 1,
  })
  data: number;
}

class UserId {
  @ApiProperty({
    required: true,
    description: '用户id',
    type: 'integer',
    example: 1,
    minimum: 1,
  })
  @Rule(RuleType.number().integer().required().min(1))
  id: number;
}

/** 删除用户 */
export class DeleteUserBody extends UserId {}

/** 修改用户状态 */
export class ChangeStatusBody extends UserId {
  @ApiProperty({
    required: true,
    description: '用户状态 0-禁用 1-正常',
    type: 'enum',
    enum: [USER_STATUS.AVAILABLE, USER_STATUS.DISABLED],
    example: USER_STATUS.AVAILABLE,
  })
  @Rule(
    RuleType.number()
      .integer()
      .required()
      .min(USER_STATUS.DISABLED)
      .max(USER_STATUS.AVAILABLE)
  )
  status: USER_STATUS;
}

/** 修改用户信息 */
export class EditUserBody extends AddUserBody {
  @ApiProperty({
    required: true,
    description: '用户id',
    type: 'integer',
    example: 1,
    minimum: 1,
  })
  @Rule(RuleType.number().integer().required().min(1))
  id: number;
}

/** 修改用户密码 */
export class ChangePasswordBody {
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

/** 查询用户列表 */
export class UserListFilter extends Pager {
  @ApiProperty({
    description: '用户昵称/姓名，支持模糊搜索',
    example: 'role-x',
  })
  @Rule(RuleType.string().empty(''))
  roleName: string;

  @ApiProperty({
    description: '手机号',
    example: '13500000000',
    maxLength: 11,
  })
  @Rule(RuleType.string().empty('').length(11))
  phone: string;

  @ApiProperty({
    required: true,
    description: '角色id',
    type: 'integer',
    example: 1,
    minimum: 1,
  })
  @Rule(RuleType.number().integer().label('角色id').empty('').min(1))
  roleId: number;

  @ApiProperty({
    description: '用户状态 0-禁用 1-正常',
    type: 'enum',
    enum: [USER_STATUS.AVAILABLE, USER_STATUS.DISABLED],
    example: 1,
  })
  @Rule(
    RuleType.number()
      .integer()
      .min(USER_STATUS.DISABLED)
      .max(USER_STATUS.AVAILABLE)
      .empty('')
  )
  status: USER_STATUS;
}

export class UserInfoResponse extends ResponseDTO {
  @ApiProperty({
    description: '用户信息',
    type: User,
  })
  data: User;
}
