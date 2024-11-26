import { Module } from '@nestjs/common';
import { UserController } from './interfaces/controllers/user.controller';

@Module({
    controllers: [UserController],
})
export class UserModule {}
