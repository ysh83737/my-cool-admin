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

declare module '@midwayjs/session' {
  export interface ISession {
    /** 密码版本 */
    pwVersion?: number;
    /** 当前验证码 */
    captcha: {
      /** 验证码文本（小写） */
      text: string;
      /** 失效时间（ms）*/
      expired: number;
      /** 错误次数 */
      incorrect?: number;
      /** 下次可重试时间（ms） */
      availableTime?: number;
    };
  }
}