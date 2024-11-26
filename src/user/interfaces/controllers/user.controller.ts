import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateUserUseCaseDto } from 'src/user/application/use-cases/create/create-user.uc-dto';
import { CreateUserUseCase } from 'src/user/application/use-cases/create/create-user.use-case';
import { DeleteUserUseCase } from 'src/user/application/use-cases/delete/delete-user.use-case';
import { GetAllUsersUseCase } from 'src/user/application/use-cases/get-all/get-all-users.use-case';
import { GetUserByIdUseCase } from 'src/user/application/use-cases/get-by-id/get-user-by-id.use-case';
import { UpdateUserUseCaseDto } from 'src/user/application/use-cases/update/update-user.uc-dto';
import { UpdateUserUseCase } from 'src/user/application/use-cases/update/update-user.use-case';

@Controller('user')
export class UserController {
    constructor(
        private readonly _createUserUseCase: CreateUserUseCase,
        private readonly _getAllUsersUseCase: GetAllUsersUseCase,
        private readonly _getUserByIdUseCase: GetUserByIdUseCase,
        private readonly _updateUserUseCase: UpdateUserUseCase,
        private readonly _deleteUserUseCase: DeleteUserUseCase,
    ) {}

    @Post()
    async create(@Body() createUserDto: CreateUserUseCaseDto) {
        return await this._createUserUseCase.execute(createUserDto);
    }

    @Get('all')
    async getAll() {
        return await this._getAllUsersUseCase.execute();
    }

    @Get(':id')
    async getById(@Param('id') id: string) {
        return await this._getUserByIdUseCase.execute({ id });
    }

    @Post('update')
    async update(@Body() updateUserDto: UpdateUserUseCaseDto) {
        return await this._updateUserUseCase.execute(updateUserDto);
    }

    @Post('delete')
    async delete(@Body() id: string) {
        return await this._deleteUserUseCase.execute({ id });
    }
}
