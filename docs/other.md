## Base concept
### Dependency Injection
- Dependency Injection (DI) là một kỹ thuật trong lập trình mà qua đó, các phụ thuộc của một lớp hoặc một thành phần được cung cấp từ bên ngoài thay vì được tự khởi tạo bên trong lớp đó. Kỹ thuật này giúp cải thiện khả năng bảo trì, kiểm thử và mở rộng của mã nguồn. Để hiểu rõ hơn về DI, chúng ta hãy đi sâu vào một số khái niệm và ví dụ cụ thể.

Tại sao cần Dependency Injection?
- Khả năng bảo trì tốt hơn: Bằng cách tách rời việc khởi tạo các đối tượng phụ thuộc ra khỏi lớp, mã nguồn trở nên dễ bảo trì và thay đổi hơn.
- Kiểm thử dễ dàng hơn: Với DI, bạn có thể dễ dàng cung cấp các mô phỏng (mock) của các đối tượng phụ thuộc trong các bài kiểm thử.
- Giảm sự phụ thuộc chặt chẽ: DI giúp giảm sự phụ thuộc chặt chẽ giữa các lớp, làm cho mã nguồn linh hoạt và dễ mở rộng hơn.

Các kiểu Dependency Injection, có ba kiểu DI chính:
- Constructor Injection: Các phụ thuộc được cung cấp thông qua hàm khởi tạo (constructor) của lớp.
- Setter Injection: Các phụ thuộc được cung cấp thông qua các phương thức setter của lớp.
- Interface Injection: Các phụ thuộc được cung cấp thông qua một interface mà lớp triển khai.

Khi nào không thể sử dụng Dependency Injection (DI)
- Có một số trường hợp mà Dependency Injection (DI) không phù hợp hoặc không khả thi. Dưới đây là một vài trường hợp đó:
1. Các đối tượng tạm thời:
- Khi bạn cần khởi tạo các đối tượng tạm thời mà không muốn hoặc không cần phải lưu chúng dưới dạng các providers dài hạn trong DI container.

2. Các đối tượng có vòng đời ngắn:
- Khi đối tượng chỉ được sử dụng trong một phương thức hoặc một phạm vi rất hẹp, việc đăng ký đối tượng đó trong DI container có thể không cần thiết và làm tăng sự phức tạp.

3. Các đối tượng có cấu trúc phức tạp:
Một số đối tượng có cấu trúc phức tạp hoặc yêu cầu khởi tạo đặc biệt có thể khó hoặc không thể đăng ký trong DI container.

4. Các thư viện hoặc mã bên thứ ba không hỗ trợ DI:
Khi bạn sử dụng các thư viện hoặc mã bên thứ ba không hỗ trợ DI, việc tích hợp chúng vào hệ thống DI của bạn có thể rất khó khăn.

5. Hiệu suất:
Trong một số trường hợp đặc biệt, sử dụng DI có thể gây ra hiệu suất kém do quá trình khởi tạo phức tạp và quản lý vòng đời các đối tượng.



### Trong NestJS (và các framework dựa trên TypeScript như Angular), @Inject là một decorator được sử dụng để tiêm (inject) các phụ thuộc vào một lớp. Đây là một phần của hệ thống Dependency Injection (DI) của NestJS, cho phép bạn dễ dàng quản lý và sử dụng các dịch vụ, lớp, hoặc giá trị trong suốt ứng dụng của mình mà không cần phải tự tay khởi tạo chúng.

Lợi ích của Dependency Injection:
- Quản lý phụ thuộc dễ dàng: Giúp quản lý các đối tượng phụ thuộc một cách hiệu quả và gọn gàng.
- Dễ dàng kiểm thử: DI giúp việc kiểm thử trở nên dễ dàng hơn, vì bạn có thể tiêm các mô phỏng hoặc stub vào các lớp trong các bài kiểm tra.

- Tăng tính linh hoạt: Cho phép thay thế các thành phần dễ dàng mà không cần thay đổi mã nguồn nhiều.

Cách sử dụng @Inject:
- Dưới đây là ví dụ cụ thể về cách sử dụng @Inject để tiêm các giá trị vào một dịch vụ:

Ví dụ: Tiêm JwtService vào một dịch vụ
Giả sử bạn muốn tiêm JwtService vào AuthService.

auth.service.ts

```typescript
import { Injectable, Inject, OnModuleInit, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { AuthHelper } from 'src/common/helpers/auth.helper';
import { ModuleRef } from '@nestjs/core';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/schemas/user.schema';
import { Model } from 'mongoose';
import { AuthValidatorService } from './auth-validator.service';
import { LoginDto } from './dto/login.dto';
import { SignUpDto } from './dto/signup.dto';

@Injectable()
export class AuthService implements OnModuleInit {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        private authHelper: AuthHelper,
        private readonly userService: UserService,
        @Inject('AccessJwtService') private accessJwtService: JwtService, // Tiêm AccessJwtService
        @Inject('RefreshJwtService') private refreshJwtService: JwtService, // Tiêm RefreshJwtService
        private readonly moduleRef: ModuleRef,
    ) {}

    onModuleInit(){
        this.authHelper = this.moduleRef.get(AuthHelper, { strict: false });
    }

    // Các phương thức khác
}
```


- implements là một từ khóa trong TypeScript và JavaScript được sử dụng để chỉ ra rằng một lớp (class) thực thi một giao diện (interface). Khi một lớp implements một giao diện, lớp đó phải cài đặt tất cả các phương thức và thuộc tính được định nghĩa trong giao diện đó. Đây là một cách để đảm bảo rằng một lớp tuân theo một hợp đồng cụ thể, giúp duy trì tính nhất quán và độ chính xác trong mã nguồn.

```typescript 
interface Animal {
  makeSound(): void;
  move(): void;
}

class Dog implements Animal {
  makeSound() {
    console.log('Woof! Woof!');
  }

  move() {
    console.log('Dog is running.');
  }
}
```