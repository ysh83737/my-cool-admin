import { ApiProperty } from '@midwayjs/swagger';
import { Role } from '../entity/role.entity';
import { ROLE_STATUS } from '../interface/role.interface';
import { ListData, Pager, ResponseDTO } from './common.dto';
import { Rule, RuleType } from '@midwayjs/validate';

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
    items: { type: Role },
  })
  records: Role[];
}

export class RoleListResponse extends ResponseDTO {
  @ApiProperty({
    description: '响应数据',
    type: RoleListData,
  })
  data: RoleListData;
}
