import { ApiProperty } from '@midwayjs/swagger';
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
