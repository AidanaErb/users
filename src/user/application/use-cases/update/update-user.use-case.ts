import { Inject, Injectable } from '@nestjs/common';
import { IUseCase } from '../../../../shared/common/use-case.interface';
import { InjectUserRepository } from '../../../infrastructure/inject-tokens';
import { UpdateUserUseCaseDto } from './update-user.uc-dto';
import { UserDto } from '../../../interfaces/dto/user.dto';
import { IUserRepository } from '../../../domain/repositories/user.repository.interface';
import { UserMapper } from '../../../infrastructure/database/mappers/user.mapper';
import { UserNotFoundException } from '../../../domain/exceptions/user-not-found.exception';

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
