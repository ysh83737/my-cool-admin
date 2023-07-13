import { Inject, Provide } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entity/user.entity';

@Provide()
export class UserService {
  @InjectEntityModel(User)
  userEntity: Repository<User>;

  @Inject()
  ctx: Context;

  async getUser() {
    const { id } = this.ctx.getAttr('user.jwt');
    const user = await this.userEntity.findOneBy({ id });
    return user;
  }
}
