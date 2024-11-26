import { Module } from '@nestjs/common';
import { UseCasesModule } from './user/infrastructure/use-cases/use-cases.module';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './user/infrastructure/database/database.module';

@Module({
    imports: [DatabaseModule, UseCasesModule, UserModule],
})
export class AppModule {}
