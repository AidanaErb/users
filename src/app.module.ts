import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UseCasesModule } from './user/infrastructure/use-cases/use-cases.module';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './user/infrastructure/database/database.module';
import { LoggerMiddleware } from './shared/common/middleware/logger.middleware';

@Module({
    imports: [DatabaseModule, UseCasesModule, UserModule],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LoggerMiddleware).forRoutes('*');
    }
}
