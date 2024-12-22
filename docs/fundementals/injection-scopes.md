### Trong NestJS, injection scopes xác định phạm vi tồn tại của các providers (dịch vụ, repository, ...) được tiêm (injected) vào các thành phần khác nhau trong ứng dụng. Hiểu rõ về các injection scopes giúp bạn kiểm soát cách các providers được khởi tạo và tái sử dụng trong suốt vòng đời của ứng dụng.

#### Các loại Injection Scopes trong NestJS
- Default Scope (Singleton)
- Request Scope
- Transient Scope

1. Default Scope (Singleton)
Mô tả:
- Đây là phạm vi mặc định của các providers trong NestJS.
- Singleton providers được khởi tạo một lần duy nhất và tồn tại cho đến khi ứng dụng dừng lại. Chúng được chia sẻ bởi tất cả các phần của ứng dụng sử dụng chúng.

Khi sử dụng:
- Sử dụng khi bạn muốn một provider được dùng chung và duy trì trong suốt vòng đời của ứng dụng.

Ví dụ:
```typescript
import { Injectable } from '@nestjs/common';

@Injectable()
export class SingletonService {
  getHello(): string {
    return 'Hello from Singleton Service';
  }
}
```

2. Request Scope
Mô tả:
- Request scoped providers được khởi tạo cho mỗi yêu cầu HTTP và tồn tại trong suốt thời gian xử lý yêu cầu đó.
- Điều này đảm bảo rằng mỗi yêu cầu nhận được một phiên bản riêng biệt của provider.

Khi sử dụng:
- Sử dụng khi bạn cần một provider có trạng thái riêng cho mỗi yêu cầu, chẳng hạn như dữ liệu liên quan đến người dùng đăng nhập hiện tại.

Ví dụ:
```typescript
import { Injectable, Scope } from '@nestjs/common';

@Injectable({ scope: Scope.REQUEST })
export class RequestService {
  getHello(): string {
    return 'Hello from Request Scoped Service';
  }
}
```

3. Transient Scope
Mô tả:
- Transient scoped providers được khởi tạo mỗi khi chúng được tiêm vào một thành phần khác.
- Điều này có nghĩa là mỗi thành phần sử dụng provider này sẽ nhận được một phiên bản mới mỗi khi cần.
Khi sử dụng:
- Sử dụng khi bạn cần một provider luôn tạo mới để đảm bảo không chia sẻ trạng thái giữa các thành phần khác nhau.

Ví dụ:
```typescript
import { Injectable, Scope } from '@nestjs/common';

@Injectable({ scope: Scope.TRANSIENT })
export class TransientService {
  getHello(): string {
    return 'Hello from Transient Scoped Service';
  }
}
```

#### Tổng kết
- Default Scope (Singleton): Provider được khởi tạo một lần và tồn tại suốt vòng đời của ứng dụng. Thích hợp cho các dịch vụ dùng chung, chẳng hạn như kết nối cơ sở dữ liệu hoặc các dịch vụ chung.

- Request Scope: Provider được khởi tạo cho mỗi yêu cầu HTTP. Thích hợp cho các dịch vụ cần dữ liệu và trạng thái riêng cho mỗi yêu cầu, như xử lý thông tin người dùng đăng nhập.

- Transient Scope: Provider được khởi tạo mỗi khi nó được tiêm vào. Thích hợp cho các dịch vụ luôn tạo mới để không chia sẻ trạng thái.