import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { map, Observable } from 'rxjs';
import { UserEntity } from 'src/modules/user/entities/user.entity';


@Injectable()
export class ClassSerializerInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {
        return next.handle().pipe(
            map(data => plainToInstance(UserEntity, data, { excludeExtraneousValues: true }))
        );
    }
}
