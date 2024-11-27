import { Inject, Injectable } from '@nestjs/common';
import { IUseCase } from '../../../../shared/common/use-case.interface';
import { InjectUserRepository } from '../../../infrastructure/inject-tokens';
import { CreateUserUseCaseDto } from './create-user.uc-dto';
import { UserDto } from '../../../interfaces/dto/user.dto';
import { IUserRepository } from '../../../domain/repositories/user.repository.interface';
import { User } from '../../../domain/entities/user.entity';
import { UserMapper } from '../../../infrastructure/database/mappers/user.mapper';
import { UserAlreadyExistsException } from '../../../domain/exceptions/user-already-exists.exception';

@Injectable()
export class CreateUserUseCase implements IUseCase<CreateUserUseCaseDto, UserDto> {
    constructor(@Inject(InjectUserRepository) private readonly _userRepository: IUserRepository) {}

    async execute(dto: CreateUserUseCaseDto): Promise<UserDto> {
        const existingUser = await this._userRepository.getByEmail(dto.email);
        if (existingUser) {
            throw new UserAlreadyExistsException();
        }
        const userToCreate = User.create(dto);
        const user = await this._userRepository.create(userToCreate);
        return UserMapper.toDto(user);
    }
}
