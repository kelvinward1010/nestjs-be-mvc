## Knowledges more about NestJS

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