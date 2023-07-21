import { Inject, Provide } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { FindOptionsWhere, Like, Repository } from 'typeorm';
import { Authority } from '../entity/authority.entity';
import { AddAuthority, AuthorityList } from '../dto/authority.dto';
import { RequestParamError } from '../error/user.error';

@Provide()
export class AuthorityService {
  @InjectEntityModel(Authority)
  authorityEntity: Repository<Authority>;

  @Inject()
  ctx: Context;

  async addAuthority(body: AddAuthority) {
    const name = body.name.trim();
    const isRepeat = await this.authorityEntity.exist({ where: { name } });
    if (isRepeat) {
      throw new RequestParamError('已存在相同的权限名');
    }
    const item = new Authority();
    item.name = name;

    const { parentId } = body;
    if (parentId) {
      const parent = await this.getAuthorityById(parentId);
      item.parent = parent;
    }

    await this.authorityEntity.save(item);
    return item.id;
  }

  async authorityList(body: AuthorityList) {
    const name = body.name?.trim();
    const where: FindOptionsWhere<Authority> = {};
    if (name) {
      where.name = Like(`%${name}%`);
    }
    const trees = await this.authorityEntity.manager
      .getTreeRepository(Authority)
      .findTrees();
    return trees;
  }

  async getAuthorityById(id: number) {
    const item = await this.authorityEntity.findOneBy({ id });
    if (!item) {
      throw new RequestParamError(`不存在id=${id}的权限`);
    }
    return item;
  }
}
