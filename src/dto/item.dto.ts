import { ApiProperty } from '@midwayjs/swagger';
import { Rule, RuleType } from '@midwayjs/validate';
import { ITEM_STATUS } from '../interface/item.interface';
import { ListData, ResponseDTO } from './common.dto';
import { Item } from '../entity/item.entity';

class ID {
  @ApiProperty({
    description: '商品id',
    required: true,
    type: 'integer',
    format: 'integer',
    minimum: 1,
    example: 1,
  })
  @Rule(RuleType.number().integer().required().min(1))
  id: number;
}

export class AddItem {
  @ApiProperty({
    description: '商品名称',
    required: true,
    maxLength: 100,
    example: 'xx商品',
  })
  @Rule(RuleType.string().required().max(100))
  name: string;

  @ApiProperty({
    description: '商品描述',
    required: true,
    maxLength: 500,
    example: '商品介绍，支持html代码',
  })
  @Rule(RuleType.string().required().max(500))
  description: string;

  @ApiProperty({
    description: '库存数量',
    type: 'integer',
    example: 0,
    minimum: 0,
  })
  @Rule(RuleType.number().integer().min(0).empty())
  stock: number;
}
export class AddItemResponse extends ResponseDTO {
  @ApiProperty({
    description: '商品id',
    type: 'integer',
    example: 1,
  })
  data: number;
}

export class EditItem extends ID {
  @ApiProperty({
    description: '商品名称',
    maxLength: 100,
    example: 'xx商品',
  })
  @Rule(RuleType.string().max(100).empty())
  name: string;

  @ApiProperty({
    description: '商品描述',
    maxLength: 500,
    example: '商品介绍，支持html代码',
  })
  @Rule(RuleType.string().max(500).empty())
  description: string;

  @ApiProperty({
    description: '库存数量',
    type: 'integer',
    example: 0,
    minimum: 0,
  })
  @Rule(RuleType.number().integer().min(0).empty())
  stock: number;
}

export class ChangeStatus extends ID {
  @ApiProperty({
    description: '商品状态 0-下架 1-正常',
    required: true,
    type: 'enum',
    enum: [ITEM_STATUS.AVAILABLE, ITEM_STATUS.DISABLED],
    example: ITEM_STATUS.AVAILABLE,
  })
  @Rule(
    RuleType.number()
      .integer()
      .required()
      .label('商品状态')
      .valid(...Object.values(ITEM_STATUS))
  )
  status: ITEM_STATUS;
}

export class ChangeStock extends ID {
  @ApiProperty({
    description: '库存数量',
    required: true,
    type: 'integer',
    example: 0,
    minimum: 0,
  })
  @Rule(RuleType.number().integer().required().min(0))
  stock: number;
}

export class ItemList {
  @ApiProperty({
    description: '商品名称',
    maxLength: 100,
    example: 'xx商品',
  })
  @Rule(RuleType.string().label('商品名称').max(100).empty(''))
  name: string;

  @ApiProperty({
    description: '商品状态',
    type: 'enum',
    enum: [ITEM_STATUS.AVAILABLE, ITEM_STATUS.DISABLED],
    example: ITEM_STATUS.AVAILABLE,
  })
  @Rule(
    RuleType.number()
      .label('商品状态')
      .valid(...Object.values(ITEM_STATUS))
  )
  status: ITEM_STATUS;
}
export class ItemListData extends ListData {
  @ApiProperty({
    description: '商品列表',
    type: 'array',
    items: { type: Item },
    example: [],
  })
  records: Item[];
}
export class ItemListResponse extends ResponseDTO {
  @ApiProperty({
    description: '响应数据',
    type: ItemListData,
  })
  data: ItemListData;
}
