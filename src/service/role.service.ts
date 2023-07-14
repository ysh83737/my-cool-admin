import { Inject, Provide } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Role } from '../entity/role.entity';
import { Repository } from 'typeorm';
import { RoleListFilter } from '../dto/role.dto';

@Provide()
export class RoleService {
  @Inject()
  ctx: Context;

  @InjectEntityModel(Role)
  roleEntity: Repository<Role>;

  async getRoleList({ page, pageSize, roleName, status }: RoleListFilter) {
    const trimRoleName = roleName.trim();
    const [records, total] = await this.roleEntity
      .createQueryBuilder('role')
      .where(trimRoleName ? `role.roleName like %${trimRoleName}%` : '')
      .andWhere(`status=${status}`)
      .orderBy('role.updateTime', 'DESC')
      .skip((page - 1) * pageSize)
      .take(pageSize)
      .getManyAndCount();
    return { records, total };
  }
}
