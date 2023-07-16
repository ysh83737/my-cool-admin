import { ApiProperty } from '@midwayjs/swagger';
import { Rule, RuleType } from '@midwayjs/validate';
import { ROLE_STATUS } from '../interface/role.interface';
import { RoleBase, RoleData } from '../entity/role.entity';
import { ListData, Pager, ResponseDTO } from './common.dto';

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

export class ChangeStatus {
  @ApiProperty({
    required: true,
    description: '角色id',
    type: 'integer',
    example: 1,
    minimum: 1,
  })
  @Rule(RuleType.number().integer().required().min(1))
  id: number;

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
