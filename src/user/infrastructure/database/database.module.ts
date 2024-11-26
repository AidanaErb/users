import { Global, Module, Provider } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { InjectUserRepository } from '../inject-tokens';
import { UserMapper } from './mappers/user.mapper';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModel } from './entities/user.model';

const repositories: Provider[] = [
    {
        provide: InjectUserRepository,
        useClass: UserRepository,
    },
];

const mappers: Provider[] = [UserMapper];

@Global()
@Module({
    imports: [
        // ConfigModule,
        // TypeOrmModule.forRootAsync({
        //     imports: [ConfigModule],
        //     useFactory: async (config: ConfigService<FullConfig>) => ({
        //         type: 'postgres',
        //         host: config.get('DB_HOST'),
        //         port: config.get<number>('DB_PORT'),
        //         username: config.get('DB_USER'),
        //         password: config.get('DB_PASSWORD'),
        //         database: config.get('DB_NAME'),
        //         synchronize: config.get<boolean>('TYPEORM_SYNC'),
        //         migrations: [__dirname + '/migrations/*{.ts,.js}'],
        //         migrationsRun: true,
        //         autoLoadEntities: true,
        //     }),
        //     inject: [ConfigService],
        // }),
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'admin',
            password: 'admin',
            database: 'users_db',
            autoLoadEntities: true,
            synchronize: true,
        }),
        TypeOrmModule.forFeature([UserModel]),
    ],
    providers: [...repositories, ...mappers],
    exports: repositories,
})
export class DatabaseModule {}
