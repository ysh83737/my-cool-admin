import { ApiProperty } from '@midwayjs/swagger';
import { Rule, RuleType } from '@midwayjs/validate';
import { ROLE_STATUS } from '../interface/role.interface';
import { RoleBase, RoleData } from '../entity/role.entity';
import { ListData, Pager, ResponseDTO } from './common.dto';
import { Authority } from '../entity/authority.entity';

export class AddRoleBody extends RoleBase {
  @Rule(RuleType.string().label('角色名称').required().max(20))
  roleName: string;

  @Rule(RuleType.string().empty(''))
  remark: string;
}

export class AddRoleResponse extends ResponseDTO {
  @ApiProperty({
    description: '角色id',
    example: 1,
  })
  data: number;
}

export class RoleId {
  @ApiProperty({
    required: true,
    description: '角色id',
    type: 'integer',
    example: 1,
    minimum: 1,
  })
  @Rule(RuleType.number().integer().required().min(1))
  id: number;
}

export class DeleteRole extends RoleId {}

export class EditRoleBody extends AddRoleBody {
  @ApiProperty({
    required: true,
    description: '角色id',
    type: 'integer',
    example: 1,
    minimum: 1,
  })
  @Rule(RuleType.number().integer().required().min(1))
  id: number;
}

export class ChangeStatus extends RoleId {
  @ApiProperty({
    required: true,
    description: '0-禁用 1-正常',
    type: 'enum',
    enum: [ROLE_STATUS.AVAILABLE, ROLE_STATUS.DISABLED],
    example: ROLE_STATUS.AVAILABLE,
  })
  @Rule(
    RuleType.number()
      .integer()
      .required()
      .min(ROLE_STATUS.DISABLED)
      .max(ROLE_STATUS.AVAILABLE)
  )
  status: ROLE_STATUS;
}

export class ChangeAuthority extends RoleId {
  @ApiProperty({
    description: '角色权限id列表',
    type: 'array',
    items: {
      type: 'integer',
    },
    example: [],
  })
  @Rule(RuleType.array().required().items(RuleType.number().integer().min(1)))
  authorities: number[];
}

export class RoleListFilter extends Pager {
  @ApiProperty({
    description: '名称，支持模糊搜索',
    example: 'role-x',
  })
  @Rule(RuleType.string().empty(''))
  roleName: string;

  @ApiProperty({
    description: '状态 0-禁用 1-正常',
    type: 'enum',
    enum: [ROLE_STATUS.AVAILABLE, ROLE_STATUS.DISABLED],
    example: 1,
  })
  @Rule(
    RuleType.number()
      .integer()
      .min(ROLE_STATUS.DISABLED)
      .max(ROLE_STATUS.AVAILABLE)
  )
  status: ROLE_STATUS;
}

export class RoleListData extends ListData {
  @ApiProperty({
    description: '角色列表',
    example: [],
    type: 'array',
    items: { type: RoleData },
  })
  records: RoleData[];
}

export class RoleListResponse extends ResponseDTO {
  @ApiProperty({
    description: '响应数据',
    type: RoleListData,
  })
  data: RoleListData;
}

export class RoleAuthority extends DeleteRole {}

export class RoleAuthorityResponse extends ResponseDTO {
  @ApiProperty({
    description: '权限数据列表',
    type: 'array',
    items: { type: Authority },
    example: [],
  })
  data: Authority[];
}
