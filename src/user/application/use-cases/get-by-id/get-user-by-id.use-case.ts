import { Inject, Injectable } from '@nestjs/common';
import { IUseCase } from '../../../../shared/common/use-case.interface';
import { InjectUserRepository } from '../../../infrastructure/inject-tokens';
import { GetUserByIdUseCaseDto } from './get-user-by-id.uc-dto';
import { UserDto } from '../../../interfaces/dto/user.dto';
import { IUserRepository } from '../../../domain/repositories/user.repository.interface';
import { UserMapper } from '../../../infrastructure/database/mappers/user.mapper';
import { UserNotFoundException } from '../../../domain/exceptions/user-not-found.exception';

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
