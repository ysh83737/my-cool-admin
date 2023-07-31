import { Inject, Provide } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import { Item } from '../entity/item.entity';
import { AddItem } from '../dto/item.dto';
import { ExecuteError } from '../error/business.error';
import { RequestParamError } from '../error/user.error';

@Provide()
export class ItemService {
  @Inject()
  ctx: Context;

  @InjectEntityModel(Item)
  itemEntity: Repository<Item>;

  async addItem(body: AddItem) {
    const item = new Item();
    Object.assign(item, body);
    const result = await this.itemEntity.save(item);
    return result.id;
  }

  async deleteItem(id: number) {
    const isExist = await this.itemEntity.exist({ where: { id: id } });
    if (!isExist) {
      throw new RequestParamError('商品不存在');
    }
    const result = await this.itemEntity.delete(id);
    if (result.affected === 0) {
      throw new ExecuteError('删除失败，请重试');
    }
  }
}
