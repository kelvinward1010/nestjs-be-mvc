### Reflector cho phép bạn truy cập và sử dụng metadata được gắn vào các lớp, phương thức và các thành phần khác thông qua decorators. Điều này rất quan trọng trong việc xây dựng các guards, filters, và interceptors có thể phản ứng dựa trên metadata tùy chỉnh.

#### Cách Sử Dụng Reflector
1. Tạo Metadata với Decorators: Reflector có thể được sử dụng cùng với các decorators để tạo và gắn metadata vào các phương thức hoặc lớp.

- Sử dụng @SetMetadata:
```typescript
import { SetMetadata } from '@nestjs/common';
export const Roles = (...roles: string[]) => SetMetadata('roles', roles);
```

- Tạo Decorator với Reflector:

```typescript
import { Reflector } from '@nestjs/core';
export const Roles = Reflector.createDecorator<string[]>();
```

2. Gắn Metadata vào Handler: Gắn metadata vào một phương thức hoặc lớp bằng cách sử dụng decorators.

```typescript
@Roles('admin')
@Controller('cats')
export class CatsController {
  @Post()
  create(@Body() createCatDto) {
    // Logic tạo mới một con mèo
  }
}
```

3. Truy Xuất Metadata trong Guards hoặc Interceptors: Reflector được sử dụng trong guards hoặc interceptors để truy xuất metadata đã được gắn vào các phương thức hoặc lớp.

```typescript
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    // Logic kiểm tra quyền truy cập dựa trên roles
    return true;
  }
}
```


### Các Phương Thức Trong Reflector
1. Reflector.get()
- Phương thức get được sử dụng để truy xuất metadata từ một mục tiêu cụ thể (lớp hoặc phương thức).

```typescript
get<T = any, K = string>(metadataKey: K, target: Type<any> | Function): T;
```
- metadataKey: Khóa của metadata cần truy xuất.
- target: Đối tượng (class hoặc function) mà metadata được gắn vào.
Ví dụ:

```typescript
const roles = this.reflector.get<string[]>('roles', context.getHandler());
```

2. Reflector.getAll()
- Phương thức getAll truy xuất tất cả các metadata từ một danh sách mục tiêu cụ thể.

```typescript
getAll<T = any>(metadataKey: any, targets: (Type<any> | Function)[]): T[];
```

- metadataKey: Khóa của metadata cần truy xuất.
- targets: Mảng các đối tượng (class hoặc function) mà metadata được gắn vào.
Ví dụ:

```typescript
const allRoles = this.reflector.getAll<string[]>('roles', [
  context.getHandler(),
  context.getClass(),
]);
```

3. Reflector.getAllAndMerge()
- Phương thức getAllAndMerge truy xuất và kết hợp tất cả các metadata từ một danh sách mục tiêu cụ thể thành một mảng.

```typescript
getAllAndMerge<T = any>(metadataKey: any, targets: (Type<any> | Function)[]): T[];
```

Ví dụ:
```typescript
const roles = this.reflector.getAllAndMerge<string[]>('roles', [
  context.getHandler(),
  context.getClass(),
]);
```

4. Reflector.getAllAndOverride()
- Phương thức getAllAndOverride truy xuất và ghi đè metadata từ một danh sách mục tiêu cụ thể.

```typescript
getAllAndOverride<T = any>(metadataKey: any, targets: (Type<any> | Function)[]): T;
```

Ví dụ:
```typescript
const roles = this.reflector.getAllAndOverride<string[]>('roles', [
  context.getHandler(),
  context.getClass(),
]);
```

5. Reflector.defineMetadata()
- Phương thức defineMetadata được sử dụng để định nghĩa metadata cho một đối tượng cụ thể.

```typescript
defineMetadata(metadataKey: any, metadataValue: any, target: Type<any> | Function): void;
```

Ví dụ:
```typescript
this.reflector.defineMetadata('roles', ['admin'], target);
```