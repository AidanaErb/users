import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './shared/common/filters/http-exception.filter';
import { ValidationPipe } from '@nestjs/common';
import { InvalidInputException } from './user/domain/exceptions/invalid-input.exception';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalFilters(new HttpExceptionFilter());
    app.useGlobalPipes(
        new ValidationPipe({
            exceptionFactory: errors => {
                return new InvalidInputException({
                    message: 'Validation Error',
                    errors: errors.map(err => ({
                        field: err.property,
                        constraints: err.constraints,
                    })),
                });
            },
        }),
    );
    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
