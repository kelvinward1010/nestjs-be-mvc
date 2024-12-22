# Knowledges more about NestJS
## I. Kiến trúc cơ bản.
### 1. Modules
##### Vai trò và Trách nhiệm:
- Tổ chức ứng dụng: Modules giúp tổ chức mã nguồn thành các phần có thể quản lý được, mỗi phần đảm nhận một chức năng cụ thể.

- Cấu trúc cây: Modules có thể nhập các modules khác, tạo ra một cấu trúc cây rõ ràng cho ứng dụng.

##### Cách làm việc:
- @Module Decorator: Được sử dụng để khai báo một module. Trong đó bạn xác định các controllers, providers và các module con.
- imports, controllers, providers: Mỗi module có ba phần chính: imports để nhập các modules khác, controllers để khai báo các controllers, và providers để khai báo các providers.
- Shared Modules: Các modules có thể chia sẻ providers thông qua việc nhập các shared modules.

```typescript
@Module({
  imports: [SharedModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

### 2. Providers
##### Vai trò và Trách nhiệm:
- Xử lý logic kinh doanh: Providers chịu trách nhiệm xử lý các logic phức tạp, giao tiếp với cơ sở dữ liệu, và cung cấp các dịch vụ khác.
- Dependency Injection: NestJS sử dụng cơ chế Dependency Injection để quản lý các providers, giúp chúng dễ dàng được tái sử dụng và quản lý.

##### Cách làm việc:
- @Injectable Decorator: Được sử dụng để khai báo một class là provider.
- Injection Scope: Providers có thể có phạm vi toàn cầu (singleton) hoặc được tạo ra mỗi khi có yêu cầu (transient).

```typescript
@Injectable()
export class UsersService {
  private users = [];

  findAll() {
    return this.users;
  }

  create(user) {
    this.users.push(user);
  }
}
```
##### Chia sẻ dữ liệu:
- Dependency Injection: Providers có thể sử dụng các providers khác thông qua Dependency Injection. Điều này cho phép các providers chia sẻ dữ liệu và dịch vụ với nhau.

### 3. Controllers
##### Vai trò và Trách nhiệm:
- Xử lý yêu cầu HTTP: Controllers chịu trách nhiệm nhận và xử lý các yêu cầu HTTP từ client.
- Định tuyến: Controllers định tuyến các yêu cầu đến các phương thức cụ thể để xử lý.

##### Cách làm việc:
- @Controller Decorator: Được sử dụng để khai báo một class là controller.
- Route Decorators: Các decorators như @Get, @Post, @Put, @Delete được sử dụng để ánh xạ các phương thức tới các routes cụ thể.

```typescript
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Post()
  create(@Body() user) {
    return this.usersService.create(user);
  }
}
```
##### Chia sẻ dữ liệu:
- Sử dụng Providers: Controllers nhận dữ liệu từ các providers để xử lý các yêu cầu HTTP. Điều này giúp tách biệt logic điều khiển và logic kinh doanh, giúp mã nguồn dễ quản lý hơn.


## II. Mở rộng trong NestJS: Middleware, Interceptors, Guards, Pipes, và Exception Filters
- NestJS không chỉ giới hạn trong việc sử dụng Modules, Providers và Controllers mà còn cung cấp nhiều công cụ mạnh mẽ khác như Middleware, Interceptors, Guards, Pipes và Exception Filters để mở rộng và tùy chỉnh ứng dụng. Dưới đây là chi tiết về từng thành phần:

### 1. Middleware
##### Vai trò và Trách nhiệm:
- Middleware là các hàm trung gian xử lý các yêu cầu trước khi chúng đến với controllers.
- Thường được sử dụng để thực hiện các tác vụ như kiểm tra xác thực, logging, hoặc thay đổi yêu cầu.
##### Cách làm việc:
- Middleware được khai báo trong các module bằng cách sử dụng apply() method của module.
- Middleware có thể được áp dụng cho toàn bộ ứng dụng hoặc chỉ cho một số routes cụ thể.

```typescript
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('Request...');
    next();
  }
}

// Áp dụng trong module
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
@Module({})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}

```

### 2. Interceptors
##### Vai trò và Trách nhiệm:
- Interceptors can thiệp vào quá trình xử lý yêu cầu và phản hồi.
- Có thể thay đổi dữ liệu phản hồi, xử lý lỗi hoặc thực hiện các tác vụ trước và sau khi một method được gọi.
##### Cách làm việc:
- Interceptors được khai báo bằng cách sử dụng @UseInterceptors decorator.
- Interceptors có thể được áp dụng cho một controller hoặc một method cụ thể.

```typescript
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('Before...');

    const now = Date.now();
    return next
      .handle()
      .pipe(
        tap(() => console.log(`After... ${Date.now() - now}ms`)),
      );
  }
}

// Áp dụng trong controller
@UseInterceptors(LoggingInterceptor)
@Controller('users')
export class UsersController {
  @Get()
  findAll() {
    return [];
  }
}
```

### 3. Guards
##### Vai trò và Trách nhiệm:
- Guards kiểm tra quyền truy cập của yêu cầu trước khi controller xử lý.
- Thường được sử dụng để bảo mật và phân quyền cho các routes.
##### Cách làm việc:
- Guards được khai báo bằng cách sử dụng @UseGuards decorator.
- Guards có thể được áp dụng cho một controller hoặc một method cụ thể.

```typescript
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return validateRequest(request);
  }
}

// Áp dụng trong controller
@UseGuards(AuthGuard)
@Controller('users')
export class UsersController {
  @Get()
  findAll() {
    return [];
  }
}
```

### 4. Pipes
##### Vai trò và Trách nhiệm:
- Pipes chuyển đổi và xác thực dữ liệu trước khi đến controller hoặc sau khi rời khỏi controller.
- Thường được sử dụng để kiểm tra và xác thực dữ liệu đầu vào.
##### Cách làm việc:
- Pipes được khai báo bằng cách sử dụng @UsePipes decorator.
- Pipes có thể được áp dụng cho toàn bộ controller hoặc một method cụ thể.

```typescript
import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';

@Injectable()
export class ParseIntPipe implements PipeTransform<string, number> {
  transform(value: string, metadata: ArgumentMetadata): number {
    const val = parseInt(value, 10);
    if (isNaN(val)) {
      throw new BadRequestException('Validation failed');
    }
    return val;
  }
}

// Áp dụng trong controller
@Controller('users')
export class UsersController {
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return { id };
  }
}
```

### 5. Exception Filters
##### Vai trò và Trách nhiệm:
- Exception Filters xử lý các lỗi và ngoại lệ phát sinh trong quá trình xử lý yêu cầu.
- Có thể tùy chỉnh cách phản hồi lỗi được gửi lại cho client.
##### Cách làm việc:
- Exception Filters được khai báo bằng cách sử dụng @UseFilters decorator.
- Filters có thể được áp dụng cho toàn bộ ứng dụng, một controller hoặc một method cụ thể.

```typescript
import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpErrorFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}

// Áp dụng trong controller
@UseFilters(HttpErrorFilter)
@Controller('users')
export class UsersController {
  @Get()
  findAll() {
    throw new HttpException('Forbidden', 403);
  }
}
```