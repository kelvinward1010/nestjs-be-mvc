## NestJS hỗ trợ việc ném các ngoại lệ (exceptions) để xử lý các lỗi khác nhau trong ứng dụng của bạn. Các ngoại lệ này giúp bạn quản lý và xử lý các tình huống lỗi một cách rõ ràng và nhất quán. Dưới đây là danh sách các ngoại lệ mà NestJS hỗ trợ:

### Các ngoại lệ chuẩn trong NestJS
1. BadRequestException
- Sử dụng khi yêu cầu không hợp lệ hoặc dữ liệu đầu vào không chính xác.

```typescript
throw new BadRequestException('Invalid request data');
```

2. UnauthorizedException
- Sử dụng khi người dùng không có quyền truy cập hoặc xác thực không thành công.

```typescript
throw new UnauthorizedException('Unauthorized');
```

3. ForbiddenException
- Sử dụng khi người dùng không có quyền truy cập vào tài nguyên.

```typescript
throw new ForbiddenException('Forbidden');
```

4. NotFoundException
- Sử dụng khi tài nguyên không được tìm thấy.

```typescript
throw new NotFoundException('Resource not found');
```

5. MethodNotAllowedException
- Sử dụng khi phương thức HTTP không được phép.

```typescript
throw new MethodNotAllowedException('Method not allowed');
```

6. NotAcceptableException
- Sử dụng khi tài nguyên không thể chấp nhận với các yêu cầu của client.

```typescript
throw new NotAcceptableException('Not acceptable');
```

7. RequestTimeoutException
- Sử dụng khi yêu cầu bị timeout.

```typescript
throw new RequestTimeoutException('Request timed out');
```

8. ConflictException
- Sử dụng khi có xung đột, ví dụ như trùng lặp dữ liệu.

```typescript
throw new ConflictException('Conflict');
```

9. GoneException
- Sử dụng khi tài nguyên không còn tồn tại.

```typescript
throw new GoneException('Gone');
```

10. PayloadTooLargeException
- Sử dụng khi payload của yêu cầu quá lớn.

```typescript
throw new PayloadTooLargeException('Payload too large');
```

11. UnsupportedMediaTypeException
- Sử dụng khi loại media không được hỗ trợ.

```typescript
throw new UnsupportedMediaTypeException('Unsupported media type');
```

12. UnprocessableEntityException
- Sử dụng khi dữ liệu không thể xử lý được.

```typescript
throw new UnprocessableEntityException('Unprocessable entity');
```

13. InternalServerErrorException
- Sử dụng khi có lỗi máy chủ nội bộ.

```typescript
throw new InternalServerErrorException('Internal server error');
```

14. NotImplementedException
- Sử dụng khi tính năng chưa được triển khai.

```typescript
throw new NotImplementedException('Not implemented');
```

15. BadGatewayException
- Sử dụng khi có lỗi từ gateway.

```typescript
throw new BadGatewayException('Bad gateway');
```

16. ServiceUnavailableException
- Sử dụng khi dịch vụ không khả dụng.

```typescript
throw new ServiceUnavailableException('Service unavailable');
```

17. GatewayTimeoutException
- Sử dụng khi gateway bị timeout.

```typescript
throw new GatewayTimeoutException('Gateway timeout');
```

