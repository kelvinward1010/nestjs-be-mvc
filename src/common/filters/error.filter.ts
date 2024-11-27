import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus } from '@nestjs/common';
import { MongoError } from 'mongodb';

@Catch(MongoError)
export class MongoExceptionFilter implements ExceptionFilter {
    catch(exception: MongoError, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();

        let status: HttpStatus;
        let message: string;

        switch (exception.code){
            case 11000: // Duplicate key error
                status = HttpStatus.CONFLICT;
                message = "Resource already exists";
                break;
            
            case 121: //Document validation failure
                status = HttpStatus.BAD_REQUEST;
                message = "Document validation failed";
                break;
            
            default: 
                status = HttpStatus.INTERNAL_SERVER_ERROR;
                message = 'Internal Server Error';
                break;
        }

        response
            .status(status)
            .json({
                statusCode: status,
                timestamp: new Date().toISOString(),
                path: request.url,
                message: exception.message || message,
            });
    }
}
