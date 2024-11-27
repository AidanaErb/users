import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../domain/entities/user.entity';
import { UserMapper } from '../database/mappers/user.mapper';
import { IUserRepository } from '../../domain/repositories/user.repository.interface';
import { UserModel } from '../database/entities/user.model';

@Injectable()
export class UserRepository implements IUserRepository {
    constructor(
        @InjectRepository(UserModel)
        private readonly _userModel: Repository<UserModel>,
    ) {}

    async create(user: User): Promise<User> {
        const entity = UserMapper.toProxyFromDomain(user);
        const newUser = this._userModel.create(entity);
        await this._userModel.save(newUser);

        return UserMapper.toDomain(newUser);
    }

    async getAll(): Promise<User[]> {
        const users = await this._userModel.find();
        return users.map(user => UserMapper.toDomain(user));
    }

    async getById(id: string): Promise<User> {
        const user = await this._userModel.findOne({
            where: { id },
        });
        if (!user) {
            return null;
        }
        return UserMapper.toDomain(user);
    }

    async getByEmail(email: string): Promise<User> {
        const user = await this._userModel.findOne({
            where: { email },
        });
        if (!user) {
            return null;
        }
        return UserMapper.toDomain(user);
    }

    async update(user: User): Promise<void> {
        const entity = UserMapper.toProxyFromDomain(user);
        await this._userModel.update({ id: user.id }, entity);
    }

    async delete(id: string): Promise<void> {
        await this._userModel.delete({ id });
    }
}
