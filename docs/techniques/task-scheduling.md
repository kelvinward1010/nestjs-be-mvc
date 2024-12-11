### Trong NestJS, việc lập lịch tác vụ (Task Scheduling) rất hữu ích cho nhiều ứng dụng thực tế. Nó cho phép bạn thực hiện các tác vụ vào các khoảng thời gian định kỳ, thực hiện tác vụ sau một khoảng thời gian nhất định hoặc thực hiện các tác vụ vào thời điểm cụ thể. Dưới đây là một cái nhìn tổng quan về cách thực hiện việc lập lịch tác vụ trong NestJS.

#### Cài Đặt và Cấu Hình Thư Viện
1. Cài Đặt Thư Viện
- Để bắt đầu với việc lập lịch tác vụ, bạn cần cài đặt thư viện @nestjs/schedule và cron.

```bash
npm install @nestjs/schedule
npm install cron
```

2. Cấu Hình ScheduleModule
- Thêm ScheduleModule vào module gốc của ứng dụng để bắt đầu sử dụng các khả năng lập lịch tác vụ.

```typescript
import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    TasksModule,
  ],
})
export class AppModule {}
```

#### Tạo Module và Service cho Các Tác Vụ Định Kỳ
Tạo một module và service để chứa các tác vụ định kỳ.
Tạo Module
```typescript
import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';

@Module({
  providers: [TasksService],
})
export class TasksModule {}
```

#### Tạo Service
Service này sẽ chứa các tác vụ được lên lịch.

```typescript
import { Injectable } from '@nestjs/common';
import { Cron, Interval, Timeout } from '@nestjs/schedule';

@Injectable()
export class TasksService {
  
  // Tác vụ chạy mỗi 10 giây
  @Cron('*/10 * * * * *')
  handleCron() {
    console.log('Task running every 10 seconds');
  }

  // Tác vụ chạy mỗi 5 giây
  @Interval(5000)
  handleInterval() {
    console.log('Task running every 5 seconds');
  }

  // Tác vụ chạy sau 15 giây từ khi server khởi động
  @Timeout(15000)
  handleTimeout() {
    console.log('Task running after 15 seconds');
  }
}
```

#### Decorators Chính cho Task Scheduling
- @Cron: Để định nghĩa một tác vụ sử dụng cú pháp cron. Ví dụ: @Cron('*/10 * * * * *') sẽ chạy tác vụ mỗi 10 giây.
- @Interval: Để định nghĩa một tác vụ chạy theo khoảng thời gian định kỳ tính bằng milliseconds. Ví dụ: @Interval(5000) sẽ chạy tác vụ mỗi 5 giây.
- @Timeout: Để định nghĩa một tác vụ chạy một lần sau một khoảng thời gian nhất định. Ví dụ: @Timeout(15000) sẽ chạy tác vụ sau 15 giây từ khi server khởi động.

#### Ứng Dụng Thực Tế
- Việc lập lịch tác vụ trong thực tế có thể áp dụng vào nhiều tình huống:
- Gửi Email Định Kỳ: Tự động gửi email thông báo, báo cáo, hoặc nhắc nhở người dùng.
- Sao Lưu Dữ Liệu: Tạo bản sao lưu định kỳ cho cơ sở dữ liệu và các tệp quan trọng.
- Dọn Dẹp Hệ Thống: Xóa các bản ghi, tệp tạm thời, hoặc các dữ liệu không cần thiết để duy trì hiệu suất hệ thống.
- Cập Nhật Thông Tin: Đồng bộ hóa dữ liệu từ các nguồn khác nhau hoặc cập nhật dữ liệu từ các API bên ngoài.
- Giám Sát Hệ Thống: Theo dõi hiệu suất hệ thống, ghi nhận số liệu và gửi cảnh báo khi phát hiện sự cố.