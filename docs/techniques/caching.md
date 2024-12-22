### Caching (lưu trữ tạm) là một kỹ thuật quan trọng trong phát triển phần mềm, giúp tối ưu hóa hiệu suất ứng dụng bằng cách lưu trữ tạm thời các kết quả đắt đỏ về mặt tính toán hoặc truy xuất từ dữ liệu bên ngoài. Trong NestJS, việc sử dụng caching có thể giúp giảm tải cho hệ thống, cải thiện thời gian phản hồi và tối ưu hóa tài nguyên. Hãy cùng tìm hiểu chi tiết về caching trong NestJS.

Tại Sao Cần Sử Dụng Caching
- Cải Thiện Hiệu Suất: Giảm thiểu thời gian truy xuất dữ liệu bằng cách sử dụng dữ liệu đã được lưu trữ tạm.
- Tiết Kiệm Tài Nguyên: Giảm tải cho hệ thống cơ sở dữ liệu và các dịch vụ bên ngoài.
- Tăng Tốc Độ Phản Hồi: Cải thiện trải nghiệm người dùng bằng cách cung cấp dữ liệu nhanh chóng.

Cách Cài Đặt Caching Trong NestJS
NestJS cung cấp một module caching dễ sử dụng qua @nestjs/cache-manager.

1. Cài Đặt Module Caching
```bash
npm install --save @nestjs/cache-manager cache-manager
```

