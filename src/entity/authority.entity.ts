import { Entity, Index, Tree, TreeChildren, TreeParent } from 'typeorm';
import {
  ColumnPro,
  PrimaryGeneratedColumnPro,
} from '../decorator/orm-pro.decorator';

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

  @TreeParent()
  parent: Authority;

  @TreeChildren()
  children: Authority[];
}
