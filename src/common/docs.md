## decorators/:
- Tác dụng: Chứa các decorator tùy chỉnh. Decorator là một tính năng của TypeScript và NestJS cho phép thêm các metadata cho lớp, phương thức, thuộc tính hoặc tham số. Decorator giúp tăng cường khả năng tái sử dụng và mở rộng của mã nguồn.

Ví dụ: Một decorator tùy chỉnh để kiểm tra quyền truy cập.

## filters/:
- Tác dụng: Chứa các bộ lọc ngoại lệ (exception filters). Exception Filter giúp xử lý ngoại lệ một cách tập trung và nhất quán, cho phép bạn tùy chỉnh cách xử lý và trả về thông tin lỗi khi có ngoại lệ xảy ra.

Ví dụ: Một exception filter để xử lý tất cả các lỗi HTTP 500 và trả về một thông báo lỗi tùy chỉnh.

## guards/:
- Tác dụng: Chứa các guard tùy chỉnh. Guard là một cơ chế trong NestJS để quyết định xem một yêu cầu có được xử lý hay không dựa trên một số logic xác định (ví dụ: kiểm tra quyền truy cập, xác thực người dùng).

Ví dụ: Một guard để kiểm tra xem người dùng có quyền truy cập vào một tài nguyên cụ thể hay không.

## middlewares/:
- Tác dụng: Chứa các middleware. Middleware là các hàm được gọi trước khi route handler thực hiện. Chúng có thể thay đổi yêu cầu, phản hồi hoặc kết thúc chuỗi xử lý.

Ví dụ: Một middleware để xác thực JWT token hoặc log thông tin về yêu cầu.

## pipes/:
- Tác dụng: Chứa các pipe tùy chỉnh. Pipe là một cơ chế để chuyển đổi dữ liệu từ một hình thức này sang một hình thức khác, thường được sử dụng để validate hoặc chuyển đổi dữ liệu đầu vào.

Ví dụ: Một pipe để validate dữ liệu đầu vào cho các DTO hoặc chuyển đổi định dạng dữ liệu.