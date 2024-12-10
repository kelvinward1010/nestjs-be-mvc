### Serialization là quá trình chuyển đổi các đối tượng dữ liệu phức tạp thành các định dạng đơn giản hơn trước khi trả về trong phản hồi mạng. Trong NestJS, quá trình này đảm bảo rằng dữ liệu được biến đổi và làm sạch trước khi gửi về cho client, giúp loại bỏ các dữ liệu nhạy cảm như mật khẩu và áp dụng các quy tắc biến đổi bổ sung.

Ví Dụ Cụ Thể và Mã Biến Đổi Dữ Liệu
1. Loại Trừ Các Thuộc Tính (Exclude Properties)
- Giả sử chúng ta muốn loại trừ thuộc tính password khỏi thực thể UserEntity. Chúng ta sử dụng decorator @Exclude() từ class-transformer:

```typescript
import { Exclude } from 'class-transformer';

export class UserEntity {
  id: number;
  firstName: string;
  lastName: string;

  @Exclude()
  password: string;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
```
- Khi controller trả về một instance của lớp này, password sẽ tự động bị loại trừ:
```typescript
import { UseInterceptors, ClassSerializerInterceptor, Get } from '@nestjs/common';

@UseInterceptors(ClassSerializerInterceptor)
@Get()
findOne(): UserEntity {
  return new UserEntity({
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    password: 'password',
  });
}
```

Kết quả:
```json
{
  "id": 1,
  "firstName": "John",
  "lastName": "Doe"
}
```

2. Hiển Thị Các Thuộc Tính (Expose Properties)
- Sử dụng @Expose() để cung cấp tên alias hoặc tính toán giá trị thuộc tính:
```typescript
import { Expose } from 'class-transformer';

export class UserEntity {
  id: number;
  firstName: string;
  lastName: string;

  @Expose()
  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
}
```

3. Biến Đổi Dữ Liệu (Transform)
- Sử dụng @Transform() để biến đổi dữ liệu. Ví dụ, chỉ trả về tên của RoleEntity thay vì toàn bộ đối tượng:

```typescript
import { Transform } from 'class-transformer';
import { RoleEntity } from './role.entity';

export class UserEntity {
  id: number;
  firstName: string;
  lastName: string;

  @Transform(({ value }) => value.name)
  role: RoleEntity;
}
```

4. Truyền Tùy Chọn (Pass Options)
- Sử dụng @SerializeOptions() để thay đổi hành vi mặc định của các hàm biến đổi:

```typescript
import { SerializeOptions } from '@nestjs/common';

@SerializeOptions({
  excludePrefixes: ['_'],
})
@Get()
findOne(): UserEntity {
  return new UserEntity();
}
```

5. Biến Đổi Các Đối Tượng Đơn Giản (Transform Plain Objects)
- Áp dụng @SerializeOptions để đảm bảo tất cả các phản hồi đều được biến đổi thành các instance của class được chỉ định:

```typescript
import { UseInterceptors, ClassSerializerInterceptor, SerializeOptions, Get, Query } from '@nestjs/common';

@UseInterceptors(ClassSerializerInterceptor)
@SerializeOptions({ type: UserEntity })
@Get()
findOne(@Query() { id }: { id: number }): UserEntity {
  if (id === 1) {
    return {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      password: 'password',
    };
  }

  return {
    id: 2,
    firstName: 'Kamil',
    lastName: 'Mysliwiec',
    password: 'password2',
  };
}
```

### Tổng Kết
##### Serialization trong NestJS giúp bạn biến đổi và làm sạch dữ liệu một cách hiệu quả trước khi trả về cho client. Các công cụ như class-transformer và class-validator cùng các decorator như @Exclude, @Expose, @Transform, và @SerializeOptions cung cấp một cách tiếp cận mạnh mẽ và linh hoạt để xử lý dữ liệu. Điều này giúp tăng cường bảo mật, đảm bảo tính nhất quán và dễ dàng mở rộng.