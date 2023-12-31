/**
 * 注册[A类]错误码
 * 错误来源于用户，比如参数错误，用户安装版本过低，用户支付超时等问题
 */
import { MidwayError } from '@midwayjs/core';

export class UserClientError extends MidwayError {
  constructor(message?: string) {
    super(message ?? '用户端错误', 'A0001');
  }
}

export class UserRegistryError extends MidwayError {
  constructor(message?: string) {
    super(message ?? '用户注册错误', 'A0100');
  }
}

export class UserRepeatError extends MidwayError {
  constructor(message?: string) {
    super(message ?? '用户已存在', 'A0111');
  }
}

export class UserFrozenError extends MidwayError {
  constructor(message?: string) {
    super(message ?? '用户账户被冻结', 'A0202');
  }
}

export class UserPasswordError extends MidwayError {
  constructor(message?: string) {
    super(message ?? '用户密码错误', 'A0210');
  }
}

export class PasswordInvalidError extends MidwayError {
  constructor(message?: string) {
    super(message ?? '密码校验失败', 'A0120');
  }
}

export class UserNotExistError extends MidwayError {
  constructor(message?: string) {
    super(message ?? '用户账户不存在', 'A0201');
  }
}

export class CaptchaError extends MidwayError {
  constructor(message?: string) {
    super(message ?? '用户验证码错误', 'A0240');
  }
}

export class CaptchaLimitError extends MidwayError {
  constructor(message?: string) {
    super(message ?? '用户验证码尝试次数超限', 'A0241');
  }
}

export class RequestParamError extends MidwayError {
  constructor(message?: string) {
    super(message ?? '用户请求参数错误', 'A0400');
  }
}

export class ParamEmptyError extends MidwayError {
  constructor(message?: string) {
    super(message ?? '请求必填参数为空', 'A0410');
  }
}
