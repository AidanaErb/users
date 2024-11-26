import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        const start = Date.now();
        const { method, originalUrl } = req;

        console.log(
            `[Request Start] Method: ${method} Endpoint: ${originalUrl} Start Time: ${new Date(start).toISOString()}`,
        );

        res.on('finish', () => {
            const end = Date.now();
            const duration = end - start;
            console.log(
                `[Request End] Method: ${method} Endpoint: ${originalUrl} End Time: ${new Date(end).toISOString()} Duration: ${duration}ms`,
            );
        });

        next();
    }
}
