import { Inject, Provide } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import * as svgCaptcha from 'svg-captcha';
import { CaptchaError, CaptchaLimitError } from '../error/user.error';

/** 验证码有效期（ms） */
const EXPIRED_MS = 5 * 60 * 1000;
/** 短时间内最大的尝试次数 */
const MAX_TRY = 5;
/** 达到最大尝试次数后，需要等待的时间 */
const AVAILABLE_TIME_MIN = 10;
const AVAILABLE_TIME_MS = AVAILABLE_TIME_MIN * 60 * 1000;

@Provide()
export class CaptchaService {
  @Inject()
  ctx: Context;

  getCaptcha() {
    let captcha = this.ctx.session.captcha;
    if (!captcha) {
      captcha = {} as never;
      this.ctx.session.captcha = captcha;
    }
    const { availableTime } = captcha;
    if (availableTime) {
      this.validateAvailableTime(availableTime);
      captcha.availableTime = undefined; // 重置
    }
    const result = svgCaptcha.create({
      size: 4,
      ignoreChars: '0o1iIl',
      noise: 3,
      color: true,
    });
    captcha.text = result.text.toLowerCase();
    captcha.expired = Date.now() + EXPIRED_MS;
    this.ctx.type = 'image/svg+xml';
    return result.data;
  }

  /**
   * 校验验证码
   * @param input 输入的验证码
   */
  validateCaptcha(input: string) {
    const captcha = this.ctx.session.captcha || ({} as never);
    const { text, expired, availableTime } = captcha;

    this.validateAvailableTime(availableTime);

    if (!expired || Date.now() > expired) {
      throw new CaptchaError('验证码已失效');
    }
    if (input.toLowerCase() !== text) {
      captcha.incorrect++;
      if (captcha.incorrect >= MAX_TRY) {
        captcha.availableTime = Date.now() + AVAILABLE_TIME_MS;
        throw new CaptchaLimitError(
          `验证码错误次数过多，请${AVAILABLE_TIME_MIN}分钟后再试`
        );
      }
      throw new CaptchaError('验证码错误');
    }
    return true;
  }

  /** 校验重试时间 */
  validateAvailableTime(availableTime: number) {
    const ms = availableTime - Date.now();
    if (ms > 0) {
      const mins = Math.ceil(ms / 1000 / 60); // 向上取整
      throw new CaptchaLimitError(`验证码错误次数过多，请${mins}分钟后再试`);
    }
  }
}
