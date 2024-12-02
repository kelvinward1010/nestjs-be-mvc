### ModuleRef là một tính năng mạnh mẽ của NestJS cho phép bạn truy cập các providers đã được đăng ký trong module tại runtime. Điều này rất hữu ích khi bạn cần khởi tạo hoặc tương tác với các providers mà không thể hoặc không muốn sử dụng DI thông thường.

Các phương thức chính của ModuleRef
1. get
- get<T>(typeOrToken: Type<T> | string | symbol, options?: { strict: boolean }): T
- Trả về instance của provider được chỉ định bởi type, token hoặc symbol.

- options.strict nếu thiết lập là true, phương thức sẽ chỉ tìm kiếm trong module hiện tại và không tìm kiếm trong các module cha.

Ví dụ:
```typescript
import { ModuleRef, Injectable } from '@nestjs/core';

@Injectable()
export class MyService {
  constructor(private readonly moduleRef: ModuleRef) {}

  someMethod() {
    const myProvider = this.moduleRef.get(MyProvider);
    myProvider.doSomething();
  }
}
```

2. resolve
- resolve<T>(typeOrToken: Type<T> | string | symbol, contextId?: ContextId, options?: { strict: boolean }): Promise<T>
- Giải quyết và trả về instance của provider được chỉ định. Thường được sử dụng với các providers có scope là REQUEST hoặc TRANSIENT.

Ví dụ:
```typescript
import { ModuleRef, Injectable } from '@nestjs/core';
import { REQUEST } from '@nestjs/core';

@Injectable()
export class MyRequestScopedService {
  constructor(private readonly moduleRef: ModuleRef) {}

  async someMethod() {
    const myProvider = await this.moduleRef.resolve(MyProvider, { scope: Scope.REQUEST });
    myProvider.doSomething();
  }
}
```

3. create
- create<T>(type: Type<T>): Promise<T>
- Tạo và trả về instance của provider được chỉ định. Phương thức này rất hữu ích khi bạn cần khởi tạo các providers một cách thủ công.

Ví dụ:
```typescript
import { ModuleRef, Injectable } from '@nestjs/core';

@Injectable()
export class MyService {
  constructor(private readonly moduleRef: ModuleRef) {}

  async someMethod() {
    const myProvider = await this.moduleRef.create(MyProvider);
    myProvider.doSomething();
  }
}
```