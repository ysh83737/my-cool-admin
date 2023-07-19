import { Inject, Provide } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from '../entity/role.entity';
import {
  AddRoleBody,
  ChangeStatus,
  DeleteRole,
  EditRoleBody,
  RoleListFilter,
} from '../dto/role.dto';
import { RequestParamError } from '../error/user.error';
import { ExecuteError } from '../error/business.error';

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
      .where(trimRoleName ? `role.roleName like "%${trimRoleName}%"` : '')
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

  async editRole(body: EditRoleBody) {
    const { id, remark } = body;
    const roleName = body.roleName.trim();
    const isRepeat = await this.roleEntity
      .createQueryBuilder('role')
      .where(`role.roleName="${roleName}"`)
      .andWhere(`id!=${id}`)
      .getExists();
    if (isRepeat) {
      throw new RequestParamError('已存在相同的角色名');
    }
    const role = await this.getRole(id);
    Object.assign(role, body, { roleName, remark });
    await this.roleEntity.save(role);
  }
  async deleteRole({ id }: DeleteRole) {
    const isExist = await this.roleEntity
      .createQueryBuilder('role')
      .where(`role.id="${id}"`)
      .getExists();
    if (!isExist) {
      throw new RequestParamError('角色不存在');
    }
    const result = await this.roleEntity.delete(id);
    if (result.affected === 0) {
      throw new ExecuteError('删除失败，请重试');
    }
  }

  async changeStatus({ id, status }: ChangeStatus) {
    const role = await this.getRole(id);
    role.status = status;
    this.roleEntity.save(role);
  }

  async getRole(id: number) {
    const role = await this.roleEntity.findOneBy({ id });
    if (!role) {
      throw new RequestParamError('角色不存在');
    }
    return role;
  }
}
