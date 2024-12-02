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