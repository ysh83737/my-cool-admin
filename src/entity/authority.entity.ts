import { Entity, Index, Tree, TreeChildren, TreeParent } from 'typeorm';
import {
  ColumnPro,
  PrimaryGeneratedColumnPro,
} from '../decorator/orm-pro.decorator';
import { AUTHORITY_TYPE } from '../interface/authority.interface';

@Entity('authority')
@Tree('closure-table')
export class Authority {
  @Index({ unique: true })
  @PrimaryGeneratedColumnPro({
    comment: '权限id',
    api: { example: 1 },
  })
  id: number;

  @ColumnPro({
    comment: '权限名',
    length: 20,
    api: { example: 'auth-xx' },
  })
  name: string;

  @ColumnPro({
    comment: '权限类型 1-菜单 2-按钮',
    type: 'enum',
    enum: AUTHORITY_TYPE,
    default: AUTHORITY_TYPE.MENU,
  })
  type: AUTHORITY_TYPE;

  @TreeParent()
  parent: Authority;

  @TreeChildren()
  children: Authority[];
}
