1. @Injectable()
- Mục đích: Đánh dấu một class là một provider, cho phép NestJS quản lý và inject nó vào các class khác.
- Sử dụng: Được sử dụng trên các service, repository, và bất kỳ class nào bạn muốn NestJS quản lý như là một dependency.

Ví dụ:

```typescript
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class CatsService {
  constructor(@Inject('CatsRepository') private catsRepository: any) {
    // 'CatsRepository' có thể là một token hoặc một class cụ thể
  }
}
```
Chi tiết:
- @Injectable() cho phép class này được tạo instance và inject vào các nơi cần thiết.
- Hữu ích khi bạn muốn chia sẻ các logic và phụ thuộc giữa các phần khác nhau của ứng dụng.

2. @Inject()
- Mục đích: Được sử dụng để inject một dependency cụ thể vào một constructor của một class.
- Sử dụng: Sử dụng khi bạn cần cụ thể hóa một dependency được inject, đặc biệt hữu ích khi sử dụng tokens hoặc khi làm việc với các providers đặc biệt.

Ví dụ:

```typescript
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class CatsService {
  constructor(@Inject('CatsRepository') private catsRepository: any) {
    // 'CatsRepository' có thể là một token hoặc một class cụ thể
  }
}
```
Chi tiết:
- @Inject() cho phép bạn kiểm soát chính xác dependency nào được inject vào constructor.
- Thường được sử dụng cùng với các custom tokens hoặc khi làm việc với các provider không có sẵn từ trước.


3. @InjectModel()
- Mục đích: Được sử dụng trong các ứng dụng sử dụng Mongoose để tương tác với MongoDB, cho phép inject một model MongoDB cụ thể vào một class.
- Sử dụng: Được sử dụng để inject các model đã được định nghĩa với Mongoose, thường là trong các service tương tác với cơ sở dữ liệu.

```typescript
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cat } from './cat.schema';

@Injectable()
export class CatsService {
  constructor(@InjectModel(Cat.name) private catModel: Model<Cat>) {}

  // Sử dụng catModel để tương tác với MongoDB
}
```

Chi tiết:
- @InjectModel() được sử dụng để inject model của Mongoose, cho phép bạn sử dụng nó trong các service để thực hiện các thao tác cơ sở dữ liệu.
- Cần thiết khi làm việc với MongoDB và Mongoose để đảm bảo các model được quản lý một cách chính xác.

Tóm tắt
- @Injectable(): Đánh dấu một class là một provider để NestJS có thể quản lý và inject nó.
- @Inject(): Được sử dụng để inject một dependency cụ thể vào constructor của một class.
- @InjectModel(): Được sử dụng trong các ứng dụng Mongoose để inject một model MongoDB cụ thể.