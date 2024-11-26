import { Inject, Injectable } from '@nestjs/common';
import { IUseCase } from 'src/shared/common/use-case.interface';
import { InjectUserRepository } from 'src/user/infrastructure/inject-tokens';
import { CreateUserUseCaseDto } from './create-user.uc-dto';
import { UserDto } from 'src/user/interfaces/dto/user.dto';
import { IUserRepository } from 'src/user/domain/repositories/user.repository.interface';
import { User } from 'src/user/domain/entities/user.entity';
import { UserMapper } from 'src/user/infrastructure/database/mappers/user.mapper';

@Injectable()
export class CreateUserUseCase implements IUseCase<CreateUserUseCaseDto, UserDto> {
    constructor(@Inject(InjectUserRepository) private readonly _userRepository: IUserRepository) {}

    async execute(dto: CreateUserUseCaseDto): Promise<UserDto> {
        const userToCreate = User.create(dto);
        const user = await this._userRepository.create(userToCreate);
        return UserMapper.toDto(user);
    }
}
