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
- Scoped Providers: Không thể lấy các provider có scope (transient hoặc request-scoped) bằng phương thức get(). Sử dụng phương thức resolve() để thay thế.

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
- Unique Instances: Mỗi lần gọi resolve() sẽ tạo ra một instance khác nhau của provider. Để tạo ra một instance duy nhất giữa nhiều lần gọi resolve(), sử dụng ContextIdFactory để tạo context identifier.

- Trong NestJS, khái niệm DI sub-tree (Dependency Injection sub-tree) đề cập đến một cây con của các phụ thuộc (dependencies) trong hệ thống DI (Dependency Injection). Nó giúp tổ chức và quản lý các providers và dependencies một cách hiệu quả và cách ly chúng khi cần thiết.

DI Sub-tree trong NestJS:
Cấu trúc của DI Sub-tree:
- Context Identifier: Mỗi DI sub-tree có một identifier duy nhất, được sử dụng để phân biệt và quản lý các instance của providers và dependencies trong cây con này.
- Scoped Providers: Các providers có scope như transient hoặc request-scoped sẽ nằm trong các DI sub-tree riêng biệt để đảm bảo rằng chúng được khởi tạo mới mỗi khi cần thiết.

Cách tạo DI Sub-tree:
- ContextIdFactory: Sử dụng ContextIdFactory để tạo một context identifier cho DI sub-tree.

```typescript
import { ContextIdFactory } from '@nestjs/core';

@Injectable()
export class CatsService implements OnModuleInit {
  constructor(private moduleRef: ModuleRef) {}

  async onModuleInit() {
    const contextId = ContextIdFactory.create();
    const transientServices = await Promise.all([
      this.moduleRef.resolve(TransientService, contextId),
      this.moduleRef.resolve(TransientService, contextId),
    ]);
    console.log(transientServices[0] === transientServices[1]); // true
  }
}
```
Ứng dụng thực tế:
- Quản lý Providers trong Context Cụ Thể: Khi có nhu cầu quản lý các instance của providers trong một ngữ cảnh cụ thể (như một request hoặc session cụ thể), sử dụng ContextIdFactory để đảm bảo các instance được nhóm lại và tái sử dụng một cách hợp lý.

- Multi-tenant Applications: Rất hữu ích trong các ứng dụng đa khách hàng (multi-tenant), nơi mỗi khách hàng có thể có các dữ liệu hoặc cấu hình riêng và cần được quản lý một cách độc lập.

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


4. Registering REQUEST Provider:
- Đăng ký một đối tượng REQUEST tùy chỉnh cho DI sub-tree được tạo thủ công bằng cách sử dụng phương thức registerRequestByContextId() của ModuleRef.

```typescript
const contextId = ContextIdFactory.create();
this.moduleRef.registerRequestByContextId(/* YOUR_REQUEST_OBJECT */, contextId);
```