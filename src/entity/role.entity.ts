import {
  CreateDateColumn,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  UpdateDateColumn,
} from 'typeorm';
import {
  ColumnPro,
  PrimaryGeneratedColumnPro,
} from '../decorator/orm-pro.decorator';
import { ROLE_STATUS } from '../interface/role.interface';
import { Authority } from './authority.entity';

/** 角色基础数据（新增） */
export class RoleBase {
  @Index({ unique: true })
  @ColumnPro({
    comment: '角色名称',
    length: 20,
    api: {
      required: true,
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
}

/** 角色一般数据（查询） */
export class RoleData extends RoleBase {
  @Index({ unique: true })
  @PrimaryGeneratedColumnPro({
    comment: '角色id',
    api: { example: 1 },
  })
  id: number;

  @ColumnPro({
    comment: '状态 0-禁用 1-正常',
    type: 'enum',
    enum: ROLE_STATUS,
    default: ROLE_STATUS.AVAILABLE,
  })
  status: ROLE_STATUS;
}

/** 角色完整数据 */
@Entity('role')
export class Role extends RoleData {
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

  @ManyToMany(() => Authority)
  @JoinTable()
  authorities: Authority[];
}
