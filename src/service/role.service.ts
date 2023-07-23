import { Inject, Provide } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from '../entity/role.entity';
import {
  AddRoleBody,
  ChangeAuthority,
  ChangeStatus,
  DeleteRole,
  EditRoleBody,
  RoleListFilter,
} from '../dto/role.dto';
import { RequestParamError } from '../error/user.error';
import { ExecuteError } from '../error/business.error';
import { AuthorityService } from './authority.service';

@Provide()
export class RoleService {
  @Inject()
  ctx: Context;

  @InjectEntityModel(Role)
  roleEntity: Repository<Role>;

  @Inject()
  authorityService: AuthorityService;

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

  async changeStatus({ id, status }: ChangeStatus) {
    const role = await this.getRole(id);
    role.status = status;
    this.roleEntity.save(role);
  }

  async changeAuthority({ id, authorities }: ChangeAuthority) {
    const role = await this.getRole(id);

    if (authorities) {
      let authItems = [];
      if (authorities.length > 0) {
        authItems = await this.authorityService.getAuthorityById(authorities);
      }
      role.authorities = authItems;
    }
    this.roleEntity.save(role);
  }

  async getRoleList({ page, pageSize, roleName = '', status }: RoleListFilter) {
    const trimRoleName = roleName.trim();
    const querier = this.roleEntity.createQueryBuilder('role');
    if (trimRoleName) {
      querier.andWhere(`role.roleName like "%${trimRoleName}%"`);
    }
    if (status) {
      querier.andWhere(`status="${status}"`);
    }
    const [records, total] = await querier
      .orderBy('role.updateTime', 'DESC')
      .skip((page - 1) * pageSize)
      .take(pageSize)
      .getManyAndCount();
    return { records, total };
  }

  async roleAuthority(id: number) {
    const role = await this.roleEntity.findOne({
      where: { id },
      relations: ['authorities'],
    });
    if (!role) {
      throw new RequestParamError('角色不存在');
    }
    return role.authorities;
  }

  async getRole(id: number) {
    const role = await this.roleEntity.findOneBy({ id });
    if (!role) {
      throw new RequestParamError('角色不存在');
    }
    return role;
  }
}
