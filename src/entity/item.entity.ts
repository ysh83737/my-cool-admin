import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@midwayjs/swagger';
import { ITEM_STATUS } from '../interface/item.interface';

/** 商品数据 */
@Entity('item')
export class Item {
  @ApiProperty({
    description: '商品id',
    type: 'integer',
    minimum: 1,
  })
  @Index({ unique: true })
  @PrimaryGeneratedColumn({
    comment: '商品id',
  })
  id: number;

  @CreateDateColumn({
    comment: '创建时间',
    select: false,
  })
  createTime: Date;

  @UpdateDateColumn({
    comment: '修改时间',
    select: false,
  })
  updateTIme: Date;

  @ApiProperty({
    description: '商品名称',
    maxLength: 100,
  })
  @Column({
    comment: '商品名称',
    length: 100,
  })
  name: string;

  @ApiProperty({
    description: '商品描述',
    maxLength: 500,
  })
  @Column({
    comment: '商品描述，支持html',
    length: 500,
  })
  description: string;

  @ApiProperty({
    description: '商品状态 0-下架 1-正常',
    type: 'enum',
    enum: [ITEM_STATUS.AVAILABLE, ITEM_STATUS.DISABLED],
  })
  @Column({
    comment: '商品状态 0-下架 1-正常',
    type: 'enum',
    enum: ITEM_STATUS,
    default: ITEM_STATUS.DISABLED,
  })
  status: ITEM_STATUS;

  @ApiProperty({
    description: '库存数量',
    type: 'integer',
    minimum: 0,
  })
  @Column({
    comment: '库存数量',
    type: 'integer',
    default: 0,
  })
  stock: number;

  @ApiProperty({
    description: '已销数量',
    type: 'integer',
    minimum: 0,
  })
  @Column({
    comment: '已销数量',
    type: 'integer',
    default: 0,
  })
  sold: number;
}
