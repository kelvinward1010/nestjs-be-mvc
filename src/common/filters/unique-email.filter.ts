import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { MongoError } from 'mongodb';

@Catch(MongoError)
export class UniqueEmailFilter implements ExceptionFilter {
    catch(exception: MongoError, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        const status = exception.code === 11000 ? 409 : 500;

        response
            .status(status)
            .json({
                statusCode: status,
                timestamp: new Date().toISOString(),
                path: request.url,
                message: exception.message,
            });
    }
}
