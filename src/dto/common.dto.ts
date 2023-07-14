import { ApiProperty } from '@midwayjs/swagger';
import { Rule, RuleType } from '@midwayjs/validate';
import { RESPONSE_CODE } from '../constants/responseCode';

export class ResponseDTO<T = any> {
  @ApiProperty({
    required: true,
    description: '响应码',
    example: RESPONSE_CODE.SUCCESS,
  })
  code: string;

  @ApiProperty({
    description: '响应数据',
    example: {},
    required: true,
  })
  data: T;

  @ApiProperty({
    description: '消息',
    example: '成功',
  })
  message: string;
}

export class ResponseEmptyDTO extends ResponseDTO {
  @ApiProperty({
    description: '响应数据',
    example: '',
  })
  data: '';
}

export class ResponseNullDTO extends ResponseDTO {
  @ApiProperty({
    description: '响应数据',
    example: null,
  })
  data: null;
}

/** 分页参数 */
export class Pager {
  @ApiProperty({
    description: '页码',
    type: 'integer',
    minimum: 1,
    example: 1,
  })
  @Rule(RuleType.number().integer().required().min(0))
  page: number;

  @ApiProperty({
    description: '分页大小',
    type: 'integer',
    minimum: 1,
    maximum: 200,
    example: 10,
  })
  @Rule(RuleType.number().integer().required().min(0).max(200))
  pageSize: number;
}

export class ListData<T = any> {
  @ApiProperty({
    description: '总数量',
    example: 0,
  })
  total: number;

  @ApiProperty({
    description: '数据列表',
    example: [],
    type: 'array',
  })
  records: T[];
}
