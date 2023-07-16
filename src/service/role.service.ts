import { Inject, Provide } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Role } from '../entity/role.entity';
import { Repository } from 'typeorm';
import { AddRoleBody, RoleListFilter } from '../dto/role.dto';
import { RequestParamError } from '../error/user.error';

@Provide()
export class RoleService {
  @Inject()
  ctx: Context;

  @InjectEntityModel(Role)
  roleEntity: Repository<Role>;

  async getRoleList({ page, pageSize, roleName = '', status }: RoleListFilter) {
    const trimRoleName = roleName.trim();
    const [records, total] = await this.roleEntity
      .createQueryBuilder('role')
      .where(trimRoleName ? `role.roleName like %${trimRoleName}%` : '')
      .andWhere(`status="${status}"`)
      .orderBy('role.updateTime', 'DESC')
      .skip((page - 1) * pageSize)
      .take(pageSize)
      .getManyAndCount();
    return { records, total };
  }

  async addRole(body: AddRoleBody) {
    const roleName = body.roleName.trim();
    const isRepeat = await this.roleEntity.exist({
      where: { roleName },
    });
    if (isRepeat) {
      throw new RequestParamError('已存在相同的角色名');
    }
    const role = new Role();
    Object.assign(role, body, { roleName });
    const result = await this.roleEntity.save(role);
    return result.id;
  }
}
