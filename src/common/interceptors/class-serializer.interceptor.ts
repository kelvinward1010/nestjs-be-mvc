import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { map, Observable } from 'rxjs';
import { UserEntity } from 'src/modules/user/entities/user.entity';


@Injectable()
export class ClassSerializerInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {
        return next.handle().pipe(
            map(response => { 
                const dataToSerialize = response.data;
                const serializedData = plainToInstance(UserEntity, dataToSerialize, { excludeExtraneousValues: true });
                return {...response, data: serializedData}; 
            })
        );
    }
}

/* 
plainToInstance với tùy chọn { excludeExtraneousValues: true } 
lọc ra các thuộc tính không cần thiết hoặc nhạy cảm, đảm bảo rằng 
chỉ những thuộc tính cần thiết và được cho phép mới xuất hiện trong 
kết quả serialized.
*/