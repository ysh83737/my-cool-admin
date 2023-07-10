/** 通用码 */
enum COMMON_CODE {
  /** 成功/正确执行 */
  SUCCESS = '00000',
  /** 未知错误 */
  UNKNOWN = '00001',
}

/**
 * [A类]错误码
 * 错误来源于用户，比如参数错误，用户安装版本过低，用户支付超时等问题
 */
enum A_USER_ERROR {
  // #region 一级宏观错误码
  /** 用户端错误 */
  USER_CLIENT_ERROR = 'A0001',
  // #endregion 一级宏观错误码
}

/**
 * [B类]错误码
 * 错误来源于当前系统，往往是业务逻辑出错，或程序健壮性差等问题
 */
enum B_BUSINESS_ERROR {
  /** 系统执行出错 */
  EXECUTE_ERROR = 'B0001',
  /** 系统执行超时 */
  EXECUTE_TIMEOUT = 'B0100',
}

/**
 * [C类]错误码
 * 错误来源于第三方服务，比如 CDN 服务出错，消息投递超时等问题
 */
enum C_3RD_ERROR {
  /** 调用第三方服务出错 */
  CALL_3RD_ERROR = 'C0001',
  /** 中间件服务出错 */
  MIDDLE_ERROR = 'C0100',
}

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
