import { ApiProperty } from '@midwayjs/swagger';
import { RESPONSE_CODE } from '../constants/responseCode';

export class ResponseDTO {
  @ApiProperty({
    required: true,
    description: '响应码',
    example: RESPONSE_CODE.SUCCESS,
  })
  code: string;

  @ApiProperty({
    description: '响应数据',
    example: {},
    examples: [{}, null],
    required: true,
  })
  data: any;

  @ApiProperty({
    description: '消息',
    example: '成功',
  })
  message: string;
}
