import { Column, Entity, Index } from 'typeorm';
import { USER_STATUS } from '../interface/user.interface';
import {
  ColumnPro,
  CreateDateColumnPro,
  PrimaryGeneratedColumnPro,
  UpdateDateColumnPro,
} from '../decorator/orm-pro.decorator';

/** 用户信息 */
@Entity('user_info')
export class User {
  @Index({ unique: true })
  @PrimaryGeneratedColumnPro({
    comment: '用户id',
    api: { example: 1 },
  })
  id: number;

  @CreateDateColumnPro({
    comment: '创建时间',
  })
  createTime: Date;

  @UpdateDateColumnPro({
    comment: '修改时间',
  })
  updateTime: Date;

  @Index({ unique: true })
  @ColumnPro({
    length: 20,
    comment: '用户登录名',
  })
  userName: string;

  @Column({ comment: '密码' })
  password: string;

  @ColumnPro({
    comment: '姓名',
    length: 20,
    nullable: true,
  })
  name: string;

  @Column({
    comment: '密码版本, 作用是改完密码，让原来的token失效',
    type: 'smallint',
    default: 1,
  })
  pwVersion: number;

  @ColumnPro({
    length: 20,
    comment: '用户昵称',
  })
  nickName: string;

  @ColumnPro({
    comment: '用户头像',
    nullable: true,
  })
  avatarUrl: string;

  @Index({ unique: true })
  @ColumnPro({
    comment: '手机号',
    nullable: true,
    length: 11,
  })
  phone: string;

  @ColumnPro({
    comment: '邮箱',
    nullable: true,
  })
  email: string;

  @ColumnPro({
    comment: '备注',
    nullable: true,
  })
  remark: string;

  @ColumnPro({
    comment: '状态  0-禁用 1-正常',
    type: 'enum',
    enum: USER_STATUS,
    default: USER_STATUS.AVAILABLE,
  })
  status: USER_STATUS;
}
