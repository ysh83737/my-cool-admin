import { ApiProperty } from '@midwayjs/swagger';
import { Rule, RuleType } from '@midwayjs/validate';
import { Authority } from '../entity/authority.entity';
import { AUTHORITY_TYPE } from '../interface/authority.interface';
import { ResponseDTO } from './common.dto';

export class AddAuthority {
  @ApiProperty({
    required: true,
    description: '权限名称',
    example: 'auth-xx',
    maxLength: 20,
  })
  @Rule(RuleType.string().label('权限名称').required().max(20))
  name: string;

  @ApiProperty({
    description: '权限类型 1-菜单 2-按钮',
    type: 'enum',
    enum: [AUTHORITY_TYPE.MENU, AUTHORITY_TYPE.BUTTON],
    example: AUTHORITY_TYPE.MENU,
    default: AUTHORITY_TYPE.MENU,
  })
  @Rule(RuleType.number().valid(...Object.values(AUTHORITY_TYPE)))
  type: AUTHORITY_TYPE;

  @ApiProperty({
    description: '父权限id',
    type: 'integer',
    example: 1,
    minimum: 1,
  })
  @Rule(RuleType.number().label('父权限id').integer().min(1).empty(''))
  parentId: number;
}

export class AddAuthorityResponse extends ResponseDTO {
  @ApiProperty({
    description: '权限id',
    example: 1,
  })
  data: number;
}

export class EditAuthority extends AddAuthority {
  @ApiProperty({
    required: true,
    description: '权限id',
    example: 1,
    type: 'integer',
  })
  @Rule(RuleType.number().integer().required().min(1))
  id: number;

  @ApiProperty({
    description: '权限名称',
    example: 'auth-xx',
    maxLength: 20,
  })
  @Rule(RuleType.string().label('权限名称').max(20))
  name: string;
}

export class AuthorityList {
  @ApiProperty({
    description: '权限名称',
    example: 'auth-xx',
  })
  @Rule(RuleType.string().label('权限名称').max(20).empty(''))
  name: string;
}

export class AuthorityListResponse extends ResponseDTO {
  @ApiProperty({
    description: '响应数据',
    type: 'array',
    items: { type: Authority },
    example: [],
  })
  data: Authority[];
}
