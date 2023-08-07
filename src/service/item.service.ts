import { Inject, Provide } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { FindOptionsWhere, Like, Repository } from 'typeorm';
import { Item } from '../entity/item.entity';
import {
  AddItem,
  ChangeStatus,
  ChangeStock,
  EditItem,
  ItemList,
} from '../dto/item.dto';
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

  async editItem(body: EditItem) {
    const { id } = body;
    const item = await this.getItemById(id);
    Object.assign(item, body);
    await this.itemEntity.save(item);
  }

  async changeStatus(body: ChangeStatus) {
    const { id, status } = body;
    const item = await this.getItemById(id);
    item.status = status;
    await this.itemEntity.save(item);
  }

  async changeStock(body: ChangeStock) {
    const { id, stock } = body;
    const item = await this.getItemById(id);
    item.stock = stock;
    await this.itemEntity.save(item);
  }

  async itemList(body: ItemList) {
    const { status } = body;
    const name = body.name?.trim();
    const where: FindOptionsWhere<Item> = {};
    if (name) where.name = Like(`%${name}%`);
    if (status) where.status = status;
    const [records, total] = await this.itemEntity.findAndCountBy(where);
    return { records, total };
  }

  async getItemById(id: number) {
    const item = await this.itemEntity.findOneBy({ id });
    if (!item) {
      throw new RequestParamError('商品不存在');
    }
    return item;
  }
}
