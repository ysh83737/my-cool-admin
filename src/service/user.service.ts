import { Inject, Provide } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import * as md5 from 'md5';
import { User } from '../entity/user.entity';
import { ChangePasswordBody } from '../dto/user.dto';

@Provide()
export class UserService {
  @InjectEntityModel(User)
  userEntity: Repository<User>;

  @Inject()
  ctx: Context;

  async updatePassword(body: ChangePasswordBody) {
    const { id } = this.ctx.getAttr('user.jwt');
    const user = await this.userEntity
      .createQueryBuilder('user')
      .where(`user.id=${id}`)
      .select(['user.id', 'user.password', 'user.pwVersion'])
      .getOne();
    user.password = md5(body.password);
    user.pwVersion++;
    this.userEntity.save(user);
    return null;
  }

  async getUser() {
    const { id } = this.ctx.getAttr('user.jwt');
    const user = await this.userEntity.findOneBy({ id });
    return user;
  }
}
