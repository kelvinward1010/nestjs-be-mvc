### Lazy loading trong NestJS là một kỹ thuật mạnh mẽ giúp tối ưu hóa hiệu suất và quản lý tài nguyên hiệu quả bằng cách chỉ tải các module khi cần thiết. Thay vì tải toàn bộ ứng dụng cùng một lúc, lazy loading cho phép bạn chỉ tải các module khi chúng thực sự được sử dụng.

#### Lợi Ích Của Lazy Loading Trong NestJS
- Tối Ưu Hiệu Suất: Giảm thời gian khởi động của ứng dụng bằng cách chỉ tải những phần cần thiết tại thời điểm ban đầu và tải thêm các phần khác khi cần.
- Quản Lý Tài Nguyên Hiệu Quả: Giảm tiêu thụ tài nguyên bộ nhớ và CPU bằng cách tránh tải các module không cần thiết cho các yêu cầu hiện tại.
- Tăng Tính Mô-đun Hóa: Cải thiện tính mô-đun của ứng dụng, giúp quản lý và bảo trì dễ dàng hơn khi các module được tách biệt và chỉ tải khi cần thiết.