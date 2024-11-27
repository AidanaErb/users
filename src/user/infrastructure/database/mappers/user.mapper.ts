import { Injectable } from '@nestjs/common';
import { UserModel } from '../entities/user.model';
import { User } from '../../../domain/entities/user.entity';
import { UserDto } from '../../../interfaces/dto/user.dto';

@Injectable()
export class UserMapper {
    public static toDomain(model: UserModel): User {
        const user = User.create({
            email: model.email,
            firstName: model.firstName,
            lastName: model.lastName,
        });

        user.id = model.id;
        user.createdAt = model.createdAt;
        user.updatedAt = model.updatedAt;

        return user;
    }

    public static toProxyFromDomain(user: User): UserModel {
        const model = new UserModel();

        model.id = user.id;
        model.email = user.email;
        model.firstName = user.firstName;
        model.lastName = user.lastName;
        model.createdAt = user.createdAt;
        model.updatedAt = user.updatedAt;

        return model;
    }

    public static toDto(user: User): UserDto {
        return {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        };
    }
}
