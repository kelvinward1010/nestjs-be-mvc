import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';
import * as cookieParser from 'cookie-parser';
import * as compression from 'compression';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule); // Sử dụng NestFactory để tạo một instance của ứng dụng NestJS dựa trên AppModule.
  
  //app.use(new MockUserMiddleware().use)
  
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());
  app.use(cookieParser())
  const port = process.env.PORT ?? 3000;

  app.enableCors({
    origin: '*', // Bật CORS cho ứng dụng để cho phép các yêu cầu từ bất kỳ nguồn gốc nào (origin: '*').
    methods: '*', // Cho phép tất cả các phương thức HTTP (methods: '*').
    allowedHeaders: '*', // Cho phép tất cả các headers (allowedHeaders: '*').
    credentials: true, // Cho phép gửi thông tin xác thực (cookies) cùng với các yêu cầu (credentials: true).
  });

  app.use(
    compression({
      level: 6,
      threshold: 1024,
      filter: (req, res) => {
        return req.headers['x-no-compression'] ? false : compression.filter(req,res)
      }
    })
  )
  
  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
}
bootstrap();
