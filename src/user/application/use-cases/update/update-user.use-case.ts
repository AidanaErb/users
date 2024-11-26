import { Inject, Injectable } from '@nestjs/common';
import { IUseCase } from 'src/shared/common/use-case.interface';
import { InjectUserRepository } from 'src/user/infrastructure/inject-tokens';
import { UpdateUserUseCaseDto } from './update-user.uc-dto';
import { UserDto } from 'src/user/interfaces/dto/user.dto';
import { IUserRepository } from 'src/user/domain/repositories/user.repository.interface';
import { UserMapper } from 'src/user/infrastructure/database/mappers/user.mapper';
import { UserNotFoundException } from 'src/user/domain/exceptions/user-not-found.exception';

@Injectable()
export class UpdateUserUseCase implements IUseCase<UpdateUserUseCaseDto, UserDto> {
    constructor(@Inject(InjectUserRepository) private readonly _userRepository: IUserRepository) {}

    async execute(dto: UpdateUserUseCaseDto): Promise<UserDto> {
        const user = await this._userRepository.getById(dto.id);
        if (!user) {
            throw new UserNotFoundException(`User with id ${dto.id} not found`, {
                useCase: UpdateUserUseCase.name,
                userId: dto.id,
            });
        }
        user.updateDetails(dto);

        await this._userRepository.update(user);
        return UserMapper.toDto(user);
    }
}
