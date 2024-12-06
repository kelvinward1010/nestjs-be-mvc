## Decorator Tùy Chỉnh Trong NestJS
### NestJS được xây dựng xoay quanh một tính năng mạnh mẽ gọi là decorators. Decorators là một khái niệm được biết đến rộng rãi trong nhiều ngôn ngữ lập trình phổ biến, nhưng trong JavaScript, chúng vẫn còn khá mới mẻ. Decorators trong ES2016 là một biểu thức trả về một hàm và có thể lấy các tham số như target, name và property descriptor làm đối số.

#### Decorators Tham Số (Param Decorators)
- NestJS cung cấp một loạt các decorators tham số hữu ích mà bạn có thể sử dụng cùng với các xử lý route HTTP. Dưới đây là một số decorators và các đối tượng Express (hoặc Fastify) tương đương:

@Request() hoặc @Req(): req
@Response() hoặc @Res(): res
@Next(): next
@Session(): req.session
@Param(param?: string): req.params / req.params[param]
@Body(param?: string): req.body / req.body[param]
@Query(param?: string): req.query / req.query[param]
@Headers(param?: string): req.headers / req.headers[param]
@Ip(): req.ip
@HostParam(): req.hosts

#### Tạo Decorator Tùy Chỉnh
- Việc tạo ra các decorators tùy chỉnh có thể làm cho mã nguồn của bạn dễ đọc và tái sử dụng hơn. Ví dụ, nếu bạn cần trích xuất thông tin người dùng từ request thường xuyên, bạn có thể tạo một decorator tùy chỉnh @User().

Ví dụ: User Decorator

```typescript
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
```

Giờ đây, bạn có thể sử dụng decorator tùy chỉnh này trong các controller của bạn

```typescript
@Get()
async findOne(@User() user: UserEntity) {
  console.log(user);
}
```

#### Truyền Dữ Liệu Vào Decorator Tùy Chỉnh
- Đôi khi, bạn có thể muốn hành vi của decorator phụ thuộc vào một số điều kiện nào đó. Bạn có thể truyền các đối số vào hàm factory của decorator. Ví dụ, một @User() decorator trích xuất các thuộc tính cụ thể từ object người dùng:

```typescript
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const User = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;
    return data ? user?.[data] : user;
  },
);
```
Sử dụng nó để truy cập các thuộc tính cụ thể:

```typescript
@Get()
async findOne(@User('firstName') firstName: string) {
  console.log(`Hello ${firstName}`);
}
```

#### Sử Dụng Pipes Với Decorator Tùy Chỉnh
- NestJS cho phép sử dụng pipes với các decorator tùy chỉnh giống như với các decorator tích hợp sẵn (@Body(), @Param(), @Query()). Ví dụ, áp dụng một validation pipe:

```typescript
@Get()
async findOne(
  @User(new ValidationPipe({ validateCustomDecorators: true }))
  user: UserEntity,
) {
  console.log(user);
}
```

#### Tổ Hợp Decorators
- NestJS cung cấp một phương thức trợ giúp applyDecorators() để tổ hợp nhiều decorators lại. Ví dụ, kết hợp tất cả các decorators liên quan đến xác thực vào một decorator duy nhất:

```typescript
import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { RolesGuard } from './roles.guard';

export function Auth(...roles: Role[]) {
  return applyDecorators(
    SetMetadata('roles', roles),
    UseGuards(AuthGuard, RolesGuard),
    ApiBearerAuth(),
    ApiUnauthorizedResponse({ description: 'Unauthorized' }),
  );
}
```
- Sử dụng decorator tùy chỉnh @Auth():

```typescript
@Get('users')
@Auth('admin')
findAllUsers() {}
```


#### Thêm metadata trong ngữ cảnh của NestJS và nhiều framework khác là quá trình thêm thông tin bổ sung vào các lớp, phương thức hoặc các yếu tố khác của ứng dụng. Metadata là những thông tin mô tả, cung cấp thêm chi tiết về các phần của mã nguồn mà không thay đổi chức năng cốt lõi của chúng.

Ý Nghĩa của Thêm Metadata
- Mô tả Đối tượng: Metadata cung cấp thông tin về đối tượng, như mô tả chức năng, cấu trúc hoặc trạng thái của nó.

- Tăng cường Khả năng Tích hợp: Metadata giúp các công cụ và framework khác có thể hiểu và tương tác với các phần của ứng dụng dễ dàng hơn.

- Giảm Độ Phức tạp: Thay vì phải đọc và phân tích toàn bộ mã nguồn, các công cụ và framework có thể sử dụng metadata để hiểu cấu trúc và chức năng của mã nguồn.

Cách Thêm Metadata với Decorators
- Trong NestJS, bạn có thể sử dụng các decorators để thêm metadata vào các lớp và phương thức. Các decorators này thường được định nghĩa bằng cách sử dụng ReflectMetadata hoặc SetMetadata từ thư viện @nestjs/common.

Ví dụ với Decorator @SetMetadata
1. Định nghĩa Metadata: Sử dụng @SetMetadata để thêm metadata vào lớp hoặc phương thức.

auth.decorator.ts:
```typescript
import { SetMetadata } from '@nestjs/common';

export const Roles = (...roles: string[]) => SetMetadata('roles', roles);
```
2. Sử dụng Metadata trong Guard: Guard có thể truy cập metadata để thực hiện xác thực và ủy quyền.

roles.guard.ts:
```typescript
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    return roles.some(role => user.roles?.includes(role));
  }
}
```