import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  UpdateDateColumn,
} from 'typeorm';
import { USER_STATUS } from '../interface/user.interface';
import {
  ColumnPro,
  JoinColumnPro,
  PrimaryGeneratedColumnPro,
} from '../decorator/orm-pro.decorator';
import { Role } from './role.entity';

/** 最小化用户信息 */
export class UserMinimum {
  @ColumnPro({
    length: 20,
    comment: '用户昵称',
    api: {
      example: 'someone',
    },
  })
  nickName: string;

  @ColumnPro({
    comment: '姓名',
    length: 20,
    nullable: true,
    api: {
      example: 'someone',
    },
  })
  name: string;

  @ColumnPro({
    comment: '用户头像',
    nullable: true,
    api: {
      example: 'https://xx.com/someone-avatar.png',
    },
  })
  avatarUrl: string;

  @Index({ unique: true })
  @ColumnPro({
    comment: '手机号',
    nullable: true,
    length: 11,
    api: {
      example: '13500000000',
    },
  })
  phone: string;

  @ColumnPro({
    comment: '邮箱',
    nullable: true,
    api: {
      format: 'email',
    },
  })
  email: string;

  @ColumnPro({
    comment: '备注',
    nullable: true,
    api: {
      example: '',
    },
  })
  remark: string;
}
/** 用户基础数据（新增） */
export class UserBase extends UserMinimum {
  @Index({ unique: true })
  @ColumnPro({
    length: 20,
    comment: '用户登录名',
    api: {
      example: 'someone',
    },
  })
  userName: string;
}

/** 用户一般数据（查询） */
export class UserData extends UserBase {
  @Index({ unique: true })
  @PrimaryGeneratedColumnPro({
    comment: '用户id',
    api: { example: 1 },
  })
  id: number;

  @ColumnPro({
    comment: '状态  0-禁用 1-正常',
    type: 'enum',
    enum: USER_STATUS,
    default: USER_STATUS.AVAILABLE,
  })
  status: USER_STATUS;
}

/** 用户完整数据 */
@Entity('user')
export class User extends UserData {
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

  @Column({ comment: '密码', select: false })
  password: string;

  @Column({
    comment: '密码版本, 作用是改完密码，让原来的token失效',
    type: 'smallint',
    default: 1,
    select: false,
  })
  pwVersion: number;

  @ManyToOne(() => Role)
  @JoinColumnPro({
    comment: '角色',
    nullable: true,
  })
  role: Role;
}
