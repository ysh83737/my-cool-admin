import { User } from '../entity/user.entity';

/** 用户状态 */
export enum USER_STATUS {
  /** 禁用 */
  DISABLED,
  /** 正常 */
  AVAILABLE,
}

/** 存放于jwt中的用户信息 */
export type UserJwtPayload = Pick<User, 'id' | 'userName' | 'pwVersion'>;
