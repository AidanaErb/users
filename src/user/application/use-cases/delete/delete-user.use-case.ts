import { Inject, Injectable } from '@nestjs/common';
import { IUseCase } from '../../../../shared/common/use-case.interface';
import { InjectUserRepository } from '../../../infrastructure/inject-tokens';
import { DeleteUserUseCaseDto } from './delete-user.uc-dto';
import { IUserRepository } from '../../../domain/repositories/user.repository.interface';
import { UserNotFoundException } from '../../../domain/exceptions/user-not-found.exception';

@Injectable()
export class DeleteUserUseCase implements IUseCase<DeleteUserUseCaseDto, boolean> {
    constructor(@Inject(InjectUserRepository) private readonly _userRepository: IUserRepository) {}

    async execute(dto: DeleteUserUseCaseDto): Promise<boolean> {
        const user = await this._userRepository.getById(dto.id);
        if (!user) {
            throw new UserNotFoundException(`User with id ${dto.id} not found`, {
                useCase: DeleteUserUseCase.name,
                userId: dto.id,
            });
        }
        await this._userRepository.delete(user.id);
        return true;
    }
}
