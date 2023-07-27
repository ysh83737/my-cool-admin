/** 通用码 */
export enum COMMON_CODE {
  /** 成功/正确执行 */
  SUCCESS = '00000',
  /** 未知错误 */
  UNKNOWN = '00001',
}

/**
 * [A类]错误码
 * 错误来源于用户，比如参数错误，用户安装版本过低，用户支付超时等问题
 */
export enum A_USER_ERROR {
  /** 用户请求参数错误 */
  REQ_PARAM_ERROR = 'A0400',
}

/**
 * [B类]错误码
 * 错误来源于当前系统，往往是业务逻辑出错，或程序健壮性差等问题
 */
export enum B_BUSINESS_ERROR {}

/**
 * [C类]错误码
 * 错误来源于第三方服务，比如 CDN 服务出错，消息投递超时等问题
 */
export enum C_3RD_ERROR {}

/**
 * 接口响应码
 * 参考[《阿里巴巴Java开发手册》](https://github.com/alibaba/p3c/blob/master/Java%E5%BC%80%E5%8F%91%E6%89%8B%E5%86%8C(%E9%BB%84%E5%B1%B1%E7%89%88).pdf)
 */
export const RESPONSE_CODE = {
  ...COMMON_CODE,
  ...A_USER_ERROR,
  ...B_BUSINESS_ERROR,
  ...C_3RD_ERROR,
};
