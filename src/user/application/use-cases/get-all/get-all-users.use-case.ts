import { Inject, Injectable } from '@nestjs/common';
import { IUseCase } from '../../../../shared/common/use-case.interface';
import { InjectUserRepository } from '../../../infrastructure/inject-tokens';
import { UserDto } from '../../../interfaces/dto/user.dto';
import { IUserRepository } from '../../../domain/repositories/user.repository.interface';
import { UserMapper } from '../../../infrastructure/database/mappers/user.mapper';

@Injectable()
export class GetAllUsersUseCase implements IUseCase<void, UserDto[]> {
    constructor(@Inject(InjectUserRepository) private readonly _userRepository: IUserRepository) {}

    async execute(): Promise<UserDto[]> {
        const users = await this._userRepository.getAll();
        return users.map(user => UserMapper.toDto(user));
    }
}
