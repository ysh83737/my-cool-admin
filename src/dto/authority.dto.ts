import { ApiProperty } from '@midwayjs/swagger';
import { Rule, RuleType } from '@midwayjs/validate';
import { ResponseDTO } from './common.dto';
import { Authority } from '../entity/authority.entity';

export class AddAuthority {
  @ApiProperty({
    required: true,
    description: '权限名称',
    example: 'auth-xx',
  })
  @Rule(RuleType.string().label('权限名称').required().max(20))
  name: string;

  @ApiProperty({
    description: '父权限id',
    format: 'integer',
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
