import '@midwayjs/core';
import { UserJwtPayload } from '../src/interface/user.interface';

declare module '@midwayjs/core' {
  export interface Context {
    /**
     * 设置用户存放在jwt中的payload信息
     * @param key
     * @param value
     */
    setAttr(key: 'user.jwt', value: UserJwtPayload): any;
    /**
     * 获取用户存放在jwt中的payload信息
     * @param key
     */
    getAttr(key: 'user.jwt'): UserJwtPayload;
  }
}