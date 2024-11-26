import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus } from '@nestjs/common';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();

        const formatter = {
            formatRestException: (exception: any) => ({
                code: exception?.code || 'INTERNAL_SERVER_ERROR',
                status: exception?.status || HttpStatus.INTERNAL_SERVER_ERROR,
                details: exception?.message || 'An unexpected error occurred',
            }),
        };

        const problemDetails = formatter.formatRestException(exception);

        response.status(problemDetails.status).json({
            code: problemDetails.code,
            status: problemDetails.status,
            message: problemDetails.details,
            timestamp: new Date().toISOString(),
            path: request.url,
        });
    }
}
