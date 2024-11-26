import { Inject, Injectable } from '@nestjs/common';
import { IUseCase } from 'src/shared/common/use-case.interface';
import { InjectUserRepository } from 'src/user/infrastructure/inject-tokens';
import { GetUserByIdUseCaseDto } from './get-user-by-id.uc-dto';
import { UserDto } from 'src/user/interfaces/dto/user.dto';
import { IUserRepository } from 'src/user/domain/repositories/user.repository.interface';
import { UserMapper } from 'src/user/infrastructure/database/mappers/user.mapper';
import { UserNotFoundException } from 'src/user/domain/exceptions/user-not-found.exception';

@Injectable()
export class GetUserByIdUseCase implements IUseCase<GetUserByIdUseCaseDto, UserDto> {
    constructor(@Inject(InjectUserRepository) private readonly _userRepository: IUserRepository) {}

    async execute(dto: GetUserByIdUseCaseDto): Promise<UserDto> {
        const { id } = dto;
        const user = await this._userRepository.getById(id);
        if (!user) {
            throw new UserNotFoundException(`User with id ${id} not found`, {
                useCase: GetUserByIdUseCase.name,
                userId: id,
            });
        }
        return UserMapper.toDto(user);
    }
}
