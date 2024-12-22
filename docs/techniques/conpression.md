1. Cài Đặt Thư Viện Compression
- Đầu tiên, hãy cài đặt thư viện compression để sử dụng trong dự án NestJS của bạn.

```bash
npm install compression
```

2. Cấu Hình Middleware Nén Dữ Liệu
- Sau khi cài đặt, bạn cần cấu hình middleware compression trong file main.ts của ứng dụng NestJS. Đây là file chính khởi tạo và chạy ứng dụng.

File: src/main.ts

```typescript
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as compression from 'compression';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Sử dụng middleware compression để nén dữ liệu
  app.use(compression());

  await app.listen(3000);
}
bootstrap();
```

3. Tùy Chỉnh Các Tùy Chọn Nén Dữ Liệu
Thư viện compression cung cấp nhiều tùy chọn để tùy chỉnh quá trình nén dữ liệu. Bạn có thể cấu hình các tùy chọn này theo nhu cầu cụ thể của ứng dụng.

Các Tùy Chọn Cơ Bản
- level: Xác định mức độ nén, từ 0 đến 9 (mức độ càng cao thì mức nén càng lớn nhưng tiêu tốn tài nguyên CPU hơn).
- threshold: Kích thước tối thiểu của phản hồi để áp dụng nén (ví dụ: 1kb).
- filter: Hàm để xác định xem một phản hồi có nên được nén hay không.

Ví Dụ Tùy Chỉnh:
```typescript
app.use(compression({
  level: 6, // Mức nén trung bình
  threshold: 1024, // Nén những phản hồi lớn hơn 1kb
  filter: (req, res) => {
    if (req.headers['x-no-compression']) {
      // Không nén nếu tiêu đề chỉ định 'x-no-compression' được thiết lập
      return false;
    }
    // Chỉ nén cho các loại nội dung nhất định
    return compression.filter(req, res);
  }
}));
```

4. Áp Dụng Nén Dữ Liệu trong Module Cụ Thể
Nếu bạn muốn áp dụng nén dữ liệu chỉ cho một số module hoặc route cụ thể, bạn có thể sử dụng middleware compression trong các controller hoặc module cụ thể.

File: src/modules/some.module.ts

```typescript
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import * as compression from 'compression';
import { SomeController } from './some.controller';

@Module({
  controllers: [SomeController],
})
export class SomeModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(compression({
        level: 6,
        threshold: 1024,
      }))
      .forRoutes(SomeController);
  }
}
```


5. Lợi Ích của Nén Dữ Liệu
- Tối ưu băng thông: Giảm kích thước dữ liệu được truyền qua mạng, tiết kiệm băng thông và giảm chi phí.
- Tăng tốc độ tải: Giảm thời gian tải trang và tăng trải nghiệm người dùng.
- Hiệu quả cho API: Cải thiện hiệu suất cho các API, đặc biệt là khi truyền tải dữ liệu JSON lớn.

Lưu Ý Quan Trọng
- Hiệu suất CPU: Nén dữ liệu có thể tiêu tốn tài nguyên CPU, do đó cần cân nhắc mức độ nén phù hợp với tài nguyên hệ thống.
- Kích thước dữ liệu ban đầu: Nén dữ liệu nhỏ có thể không hiệu quả, đôi khi còn làm tăng kích thước phản hồi do chi phí nén.
- Nội dung không thể nén: Một số loại nội dung như hình ảnh hoặc video đã được nén hiệu quả, việc nén thêm sẽ không mang lại lợi ích.