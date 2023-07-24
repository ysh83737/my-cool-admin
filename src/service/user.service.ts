import { Inject, Provide } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import * as md5 from 'md5';
import { User } from '../entity/user.entity';
import {
  AddUserBody,
  ChangePasswordBody,
  ChangeStatusBody,
  EditUserBody,
  UserInfoData,
  UserListFilter,
} from '../dto/user.dto';
import { RequestParamError, UserRepeatError } from '../error/user.error';
import { ExecuteError } from '../error/business.error';
import { RoleService } from './role.service';

@Provide()
export class UserService {
  @InjectEntityModel(User)
  userEntity: Repository<User>;

  @Inject()
  ctx: Context;

  @Inject()
  roleService: RoleService;

  async addUser(body: AddUserBody) {
    const userName = body.userName.trim();
    const phone = body.phone.trim();
    const password = md5(body.password);

    let isRepeat = await this.userEntity.exist({ where: { userName } });
    if (isRepeat) throw new UserRepeatError('已存在相同的用户登录名');
    isRepeat = await this.userEntity.exist({ where: { phone } });
    if (isRepeat) throw new UserRepeatError('已存在相同的手机号');

    const user = new User();
    try {
      const roleId = body.roleId;
      if (roleId) {
        const role = await this.roleService.getRole(roleId);
        user.role = role;
      }
      Object.assign(user, body, { userName, phone, password });
      await this.userEntity.save(user);
    } catch (error) {
      throw new ExecuteError(error?.message);
    }

    return user.id;
  }

  async deleteUser(id: number) {
    const isExist = await this.userEntity.exist({ where: { id } });
    if (!isExist) {
      throw new RequestParamError('用户不存在');
    }
    const result = await this.userEntity.delete(id);
    if (result.affected === 0) {
      throw new ExecuteError('删除失败，请重试');
    }
  }

  async editUser(body: EditUserBody) {
    const { id } = body;
    const phone = body.phone?.trim();
    const querier = this.userEntity
      .createQueryBuilder('user')
      .where(`user.id!=${id}`);
    let checkRepeat = false;
    if (phone) {
      checkRepeat = true;
      querier.andWhere(`user.phone="${phone}"`);
    }
    const isRepeat = checkRepeat && (await querier.getExists());
    if (isRepeat) throw new UserRepeatError('已存在相同的手机号');

    const user = await this.getUserById(id);
    Object.assign(user, body, { phone });

    const roleId = body.roleId;
    if (roleId) {
      const role = await this.roleService.getRole(roleId);
      user.role = role;
    }
    await this.userEntity.save(user);
  }

  async changeUserStatus({ id, status }: ChangeStatusBody) {
    const user = await this.getUserById(id);
    user.status = status;
    this.userEntity.save(user);
  }

  async changePassword(body: ChangePasswordBody) {
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

  async userList(body: UserListFilter) {
    const userName = body.userName?.trim();
    const phone = body.phone?.trim();
    const { roleId, status, page, pageSize } = body;
    const querier = this.userEntity
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.role', 'role');
    if (userName) querier.andWhere(`user.userName like "%${userName}%"`);
    if (phone) querier.andWhere(`user.phone like "%${phone}%"`);
    if (roleId) querier.andWhere(`user.roleId=${roleId}`);
    if (typeof status === 'number') {
      querier.andWhere(`user.status="${status}"`);
    }
    const [records, total] = await querier
      .skip((page - 1) * pageSize)
      .take(pageSize)
      .getManyAndCount();
    return { records, total };
  }

  /** 获取当前用户信息 */
  async getUserInfo() {
    const { id } = this.ctx.getAttr('user.jwt');
    const user = await this.getUserById(id);
    const output: UserInfoData = { user, authorities: [] };
    if (user.role) {
      output.authorities = await this.roleService.roleAuthority(user.role.id);
    }
    return output;
  }

  async getUserById(id: number) {
    const user = await this.userEntity.findOne({
      relations: ['role'],
      where: { id },
    });
    if (!user) {
      throw new RequestParamError('用户不存在');
    }
    return user;
  }
}
