import { BadRequestException, CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable, tap } from "rxjs";


@Injectable()
export class BodyCheckInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const request = context.switchToHttp().getRequest();
        const body = request.body;
        if (!body) {
            throw new Error('Body is missing requiredField');
        }
        
        body.age = 22
        
        console.log('Body:', body);
        return next.handle().pipe(
            tap((data) => {
                if (!data) { 
                    throw new BadRequestException('No data found'); 
                }   
                console.log('After handling request:', data);
            }),
        );
    }
}
