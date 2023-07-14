import { CreateDateColumn, Entity, Index, UpdateDateColumn } from 'typeorm';
import {
  ColumnPro,
  PrimaryGeneratedColumnPro,
} from '../decorator/orm-pro.decorator';
import { ROLE_STATUS } from '../interface/role.interface';

@Entity('role')
export class Role {
  @Index({ unique: true })
  @PrimaryGeneratedColumnPro({
    comment: '角色id',
    api: { example: 1 },
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
  updateTime: Date;

  @Index({ unique: true })
  @ColumnPro({
    comment: '角色名称',
    length: 20,
    api: {
      example: 'role-xxx',
    },
  })
  roleName: string;
  @ColumnPro({
    comment: '备注',
    nullable: true,
    api: { example: '' },
  })
  remark: string;

  @ColumnPro({
    comment: '状态 0-禁用 1-正常',
    type: 'enum',
    enum: ROLE_STATUS,
    default: ROLE_STATUS.AVAILABLE,
  })
  status: ROLE_STATUS;
}
