import { User } from '../entities/user.entity';

export interface IUserRepository {
    create(user: User): Promise<User>;

    getAll(): Promise<User[]>;

    getById(id: string): Promise<User>;

    getByEmail(email: string): Promise<User>;

    update(user: User): Promise<void>;

    delete(id: string): Promise<void>;
}
