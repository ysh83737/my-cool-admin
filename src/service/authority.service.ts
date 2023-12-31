import { Inject, Provide } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { FindOptionsWhere, In, Like, Not, Repository } from 'typeorm';
import { Authority } from '../entity/authority.entity';
import {
  AddAuthority,
  AuthorityList,
  EditAuthority,
} from '../dto/authority.dto';
import { RequestParamError } from '../error/user.error';
import { ExecuteError } from '../error/business.error';

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
    const { parentId, type } = body;

    const item = new Authority();
    item.name = name;
    item.type = type;

    if (parentId) {
      const parent = await this.getAuthorityById(parentId);
      item.parent = parent;
    }

    await this.authorityEntity.save(item);
    return item.id;
  }

  async deleteAuthority(id: number) {
    const item = await this.getAuthorityById(id);

    const tree = await this.authorityEntity.manager
      .getTreeRepository(Authority)
      .findDescendantsTree(item);
    /** 需要清除父权限的数据 */
    const { children } = tree;
    for (let i = 0; i < children.length; i++) {
      const child = children[i];
      child.parent = null; // 清除父权限
      await this.authorityEntity.save(child); // 保存
    }

    const result = await this.authorityEntity.delete(id);
    if (result.affected === 0) {
      throw new ExecuteError('删除失败，请重试');
    }
  }

  async editAuthority({ id, name, parentId, type }: EditAuthority) {
    name = name?.trim();
    if (name) {
      const isRepeat = await this.authorityEntity.exist({
        where: { name, id: Not(id) },
      });
      if (isRepeat) {
        throw new RequestParamError('已存在相同的权限名');
      }
    }

    const item = await this.getAuthorityById(id);
    if (parentId) {
      const parent = await this.getAuthorityById(parentId);
      item.parent = parent;
    }
    item.name = name;
    item.type = type;
    this.authorityEntity.save(item);
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

  /**
   * 查询指定id的单条权限数据
   * @param id 查询id
   * @returns 该id的单条权限数据
   */
  getAuthorityById(id: number): Promise<Authority>;
  /**
   * 查询多个id的权限数据（不含树形结构）
   * @param ids 查询id列表
   * @returns 这些id的权限数据（不含树形结构）
   */
  getAuthorityById(ids: number[]): Promise<Authority[]>;
  async getAuthorityById(id: number | number[]) {
    let single = false;
    let ids: number[];
    if (Array.isArray(id)) {
      ids = id;
    } else {
      ids = [id];
      single = true;
    }
    const items = await this.authorityEntity.findBy({ id: In(ids) });
    if (items.length < ids.length) {
      const idSet = new Set(ids);
      items.forEach(({ id }) => idSet.delete(id));
      throw new RequestParamError(`不存在 id=${[...idSet].join('/')} 的权限`);
    }
    return single ? items[0] : items;
  }
}
