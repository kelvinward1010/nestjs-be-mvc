### Server-Sent Events (SSE) trong NestJS là một cách hiệu quả để gửi dữ liệu thời gian thực từ server đến client. SSE cho phép server gửi luồng cập nhật dữ liệu tự động đến client mà không cần client phải liên tục gửi yêu cầu kiểm tra cập nhật. Dưới đây là tóm tắt cách sử dụng SSE trong NestJS:

1. Khái Niệm Chính
- SSE: Là một giao thức nhẹ giúp server có thể gửi các sự kiện cập nhật tới client qua HTTP.
- Observable: Trong NestJS, RxJS được sử dụng để tạo ra các observable, giúp quản lý dòng dữ liệu và phát ra các sự kiện liên tục.

2. Cài Đặt
- Khởi tạo dự án NestJS:
```bash
nest new sse-example
cd sse-example
```
- Cài đặt RxJS:
```bash
npm install rxjs
```

3. Tạo module SSE
Controller: Định nghĩa endpoint cho SSE.
- sse.controller.ts:
```typescript
import { Controller, Get, Sse } from '@nestjs/common';
import { Observable } from 'rxjs';
import { SseService } from './sse.service';

@Controller('sse')
export class SseController {
  constructor(private readonly sseService: SseService) {}

  @Get('events')
  @Sse()
  sendEvents(): Observable<MessageEvent> {
    return this.sseService.getEvents();
  }
}
```

Service: Tạo dữ liệu sự kiện SSE.
- sse.service.ts:
```typescript
import { Injectable } from '@nestjs/common';
import { interval, map, Observable, takeWhile } from 'rxjs';

@Injectable()
export class SseService {
  getEvents(): Observable<MessageEvent> {
    const message = 'Hello, this is a real-time message streamed character by character!';
    return interval(200).pipe(
      takeWhile(index => index < message.length),
      map(index => {
        const data = message.charAt(index);
        return new MessageEvent('message', { data });
      }),
    );
  }
}
```

Module: Đăng ký controller và service cho SSE.
- sse.module.ts:
```typescript
import { Module } from '@nestjs/common';
import { SseController } from './sse.controller';
import { SseService } from './sse.service';

@Module({
  controllers: [SseController],
  providers: [SseService],
})
export class SseModule {}
```

4. Import Module SSE vào App Module
- app.module.ts:
```typescript
import { Module } from '@nestjs/common';
import { SseModule } from './sse/sse.module';

@Module({
  imports: [SseModule],
})
export class AppModule {}
```

5. Kiểm Tra
- Khởi động server:
```bash
npm run dev || bun dev
```

- Tạo file HTML để kiểm tra:
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>SSE Test</title>
</head>
<body>
  <h1>Server-Sent Events (SSE) Test</h1>
  <div id="messages"></div>
  <script>
    const eventSource = new EventSource('http://localhost:3000/sse/events');
    const messagesDiv = document.getElementById('messages');

    eventSource.onmessage = function(event) {
      const newMessage = document.createElement('span');
      newMessage.textContent = event.data;
      messagesDiv.appendChild(newMessage);
    };

    eventSource.onerror = function(error) {
      console.error('Error:', error);
      eventSource.close();
    };
  </script>
</body>
</html>
```


### Tổng Kết
- Sử dụng SSE trong NestJS giúp gửi dữ liệu thời gian thực từ server đến client.
- RxJS: Sử dụng để tạo observable và quản lý dòng dữ liệu.
- MessageEvent: Đảm bảo dữ liệu gửi tuân thủ cấu trúc của MessageEvent.