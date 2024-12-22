### Trong NestJS, các Asynchronous Providers (Nhà cung cấp không đồng bộ) rất hữu ích khi bạn cần tạo ra các dịch vụ hoặc đối tượng phụ thuộc vào các thao tác không đồng bộ như truy vấn cơ sở dữ liệu, gọi API, hoặc tải tài nguyên từ xa. Asynchronous providers cho phép bạn thực hiện các tác vụ không đồng bộ trong quá trình khởi tạo dịch vụ mà vẫn đảm bảo các phụ thuộc của ứng dụng được khởi tạo chính xác.

#### Cách triển khai Asynchronous Providers
1. Sử dụng useFactory với Promise
- Một cách phổ biến để tạo Asynchronous Providers trong NestJS là sử dụng thuộc tính useFactory kết hợp với Promise. Điều này cho phép bạn thực hiện các thao tác không đồng bộ và trả về giá trị khi hoàn thành.

Ví dụ cụ thể:

```typescript
import { Module, DynamicModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { createConnection } from 'typeorm';

@Module({})
export class DatabaseModule {
  static forRoot(): DynamicModule {
    return {
      module: DatabaseModule,
      imports: [ConfigModule],
      providers: [
        {
          provide: 'DATABASE_CONNECTION',
          useFactory: async (configService: ConfigService) => {
            const connection = await createConnection({
              type: 'mysql',
              host: configService.get<string>('DB_HOST'),
              port: configService.get<number>('DB_PORT'),
              username: configService.get<string>('DB_USERNAME'),
              password: configService.get<string>('DB_PASSWORD'),
              database: configService.get<string>('DB_DATABASE'),
              entities: [],
              synchronize: true,
            });
            return connection;
          },
          inject: [ConfigService],
        },
      ],
      exports: ['DATABASE_CONNECTION'],
    };
  }
}
```

2. Sử dụng useClass với class không đồng bộ
- Bạn cũng có thể sử dụng thuộc tính useClass để triển khai các Asynchronous Providers. Điều này hữu ích khi bạn muốn tách biệt logic khởi tạo không đồng bộ ra một class riêng biệt.

async.service.ts
```typescript
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createConnection, Connection } from 'typeorm';

@Injectable()
export class AsyncDatabaseService {
  private connection: Connection;

  constructor(private readonly configService: ConfigService) {}

  async onModuleInit() {
    this.connection = await createConnection({
      type: 'mysql',
      host: this.configService.get<string>('DB_HOST'),
      port: this.configService.get<number>('DB_PORT'),
      username: this.configService.get<string>('DB_USERNAME'),
      password: this.configService.get<string>('DB_PASSWORD'),
      database: this.configService.get<string>('DB_DATABASE'),
      entities: [],
      synchronize: true,
    });
  }

  getConnection(): Connection {
    return this.connection;
  }
}
```

database.module.ts với useClass
```typescript
import { Module, DynamicModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AsyncDatabaseService } from './async.service';

@Module({})
export class DatabaseModule {
  static forRoot(): DynamicModule {
    return {
      module: DatabaseModule,
      imports: [ConfigModule],
      providers: [
        {
          provide: 'DATABASE_SERVICE',
          useClass: AsyncDatabaseService,
        },
      ],
      exports: ['DATABASE_SERVICE'],
    };
  }
}
```

3. Sử dụng useExisting để tái sử dụng các providers hiện có
- Khi bạn muốn sử dụng lại một provider đã tồn tại nhưng có một cách khởi tạo khác, bạn có thể sử dụng thuộc tính useExisting.

database.module.ts với useExisting

```typescript
import { Module, DynamicModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseService } from './database.service';

@Module({})
export class DatabaseModule {
  static forRoot(): DynamicModule {
    return {
      module: DatabaseModule,
      imports: [ConfigModule],
      providers: [
        DatabaseService,
        {
          provide: 'DATABASE_CONNECTION',
          useExisting: DatabaseService,
        },
      ],
      exports: ['DATABASE_CONNECTION'],
    };
  }
}
```


### Asynchronous providers trong NestJS giải quyết các vấn đề liên quan đến việc khởi tạo và cung cấp các dependencies không đồng bộ (asynchronous dependencies) trong ứng dụng. Đây có thể là các dịch vụ mà việc khởi tạo cần phải thực hiện các thao tác không đồng bộ như truy vấn cơ sở dữ liệu, gọi API bên ngoài, hoặc các thao tác I/O khác.

#### Tác dụng gì?
- Khởi tạo không đồng bộ: Cho phép các providers thực hiện các thao tác khởi tạo không đồng bộ trước khi các thành phần khác sử dụng chúng.
- Quản lý dependencies phức tạp: Giúp quản lý và khởi tạo các dependencies phức tạp một cách rõ ràng và hiệu quả.
- Hiệu suất và Tối ưu hóa: Giảm thời gian khởi động ứng dụng bằng cách thực hiện các thao tác không đồng bộ và chỉ tiếp tục khi các dependencies đã được khởi tạo xong.

#### Tại sao phải dùng?
- Dependencies không đồng bộ: Khi một provider cần thực hiện các thao tác khởi tạo không đồng bộ (ví dụ: kết nối đến cơ sở dữ liệu, lấy khóa API, xác thực...).
- Tối ưu hóa quá trình khởi tạo: Giảm thời gian khởi động và đảm bảo rằng tất cả các dependencies được khởi tạo đúng cách trước khi sử dụng.
- Tăng tính linh hoạt: Cho phép bạn dễ dàng chuyển đổi giữa các môi trường hoặc cấu hình khác nhau mà không cần thay đổi mã nguồn chính.

#### Lúc nào cần?
- Kết nối cơ sở dữ liệu: Khi bạn cần kết nối đến một cơ sở dữ liệu mà quá trình này cần thực hiện không đồng bộ.
- API bên ngoài: Khi bạn cần khởi tạo một dịch vụ dựa trên dữ liệu từ một API bên ngoài.
- Các dịch vụ cần xác thực: Khi bạn cần lấy token hoặc xác thực trước khi khởi tạo dịch vụ.