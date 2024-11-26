import { Global, Module } from '@nestjs/common';
import { CreateUserUseCase } from 'src/user/application/use-cases/create/create-user.use-case';
import { DeleteUserUseCase } from 'src/user/application/use-cases/delete/delete-user.use-case';
import { GetAllUsersUseCase } from 'src/user/application/use-cases/get-all/get-all-users.use-case';
import { GetUserByIdUseCase } from 'src/user/application/use-cases/get-by-id/get-user-by-id.use-case';
import { UpdateUserUseCase } from 'src/user/application/use-cases/update/update-user.use-case';

const useCases = [
    CreateUserUseCase,
    GetAllUsersUseCase,
    GetUserByIdUseCase,
    UpdateUserUseCase,
    DeleteUserUseCase,
];

@Global()
@Module({
    providers: useCases,
    exports: useCases,
})
export class UseCasesModule {}
