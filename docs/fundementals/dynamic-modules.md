### Trong NestJS, dynamic modules là một tính năng mạnh mẽ cho phép bạn cấu hình các module một cách linh hoạt và động dựa trên các tham số hoặc điều kiện tại thời điểm runtime. Điều này rất hữu ích trong các trường hợp mà cấu hình của module có thể thay đổi hoặc cần dựa trên dữ liệu nhận được từ các nguồn bên ngoài.

#### Trường hợp sử dụng Dynamic Modules
1. Cấu hình module theo điều kiện
- Bạn có thể muốn thay đổi cấu hình của một module dựa trên các điều kiện như môi trường (development, production), cấu hình từ file hoặc biến môi trường.

Ví dụ: Cấu hình kết nối cơ sở dữ liệu thay đổi dựa trên môi trường:

```typescript
@Module({})
export class DatabaseModule {
  static forRoot(options: DatabaseModuleOptions): DynamicModule {
    const providers = createDatabaseProviders(options);
    return {
      module: DatabaseModule,
      providers: providers,
      exports: providers,
    };
  }
}
```

2. Module phụ thuộc vào dịch vụ bên ngoài
- Khi một module phụ thuộc vào các dịch vụ bên ngoài, dynamic modules có thể được sử dụng để cấu hình các tham số kết nối hoặc các cài đặt đặc thù cho từng dịch vụ.

Ví dụ: Module gửi email sử dụng các dịch vụ SMTP khác nhau:

```typescript
@Module({})
export class MailModule {
    static forRoot(options: MailModuleOptions): DynamicModule {
        return {
        module: MailModule,
        providers: [
            {
            provide: MAIL_CONFIG,
            useValue: options,
            },
            MailService,
        ],
        exports: [MailService],
        };
    }
}
```

3. Cấu hình động dựa trên input của người dùng
- Trong một số trường hợp, bạn cần phải thay đổi cấu hình của module dựa trên input của người dùng hoặc các tham số được cung cấp tại thời điểm runtime.

Ví dụ: Module phân tích dữ liệu mà cấu hình dựa trên input của người dùng:

```typescript
@Module({})
export class AnalyticsModule {
  static forRoot(options: AnalyticsOptions): DynamicModule {
    const providers = createAnalyticsProviders(options);
    return {
      module: AnalyticsModule,
      providers: providers,
      exports: providers,
    };
  }
}
```


##### Cách triển khai Dynamic Modules
1. Định nghĩa module với phương thức forRoot
Phương thức forRoot được sử dụng để tạo ra module với các tham số cấu hình động. Phương thức này trả về một DynamicModule object chứa các providers và configurations dựa trên tham số nhận vào.

```typescript
@Module({})
export class ConfigurableModule {
  static forRoot(config: ConfigOptions): DynamicModule {
    return {
      module: ConfigurableModule,
      providers: [
        {
          provide: CONFIG_OPTIONS,
          useValue: config,
        },
        ConfigService,
      ],
      exports: [ConfigService],
    };
  }
}
```

2. Sử dụng module trong AppModule
- Bạn sử dụng module với các tham số cấu hình tại thời điểm khởi tạo ứng dụng trong AppModule.

```typescript
import { Module } from '@nestjs/common';
import { ConfigurableModule } from './configurable.module';

@Module({
  imports: [
    ConfigurableModule.forRoot({
      apiKey: 'API_KEY',
      apiSecret: 'API_SECRET',
    }),
  ],
})
export class AppModule {}
```