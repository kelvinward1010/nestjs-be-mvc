import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as path from 'path';
import { convertImageToBase64, getRandomFile } from '../utils/file.utils';

@Injectable()
export class Base64ImagesInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const defaultImageDir = path.join(process.cwd(), 'src', 'assets'); // Sử dụng process.cwd() để lấy thư mục gốc của dự án
        const request = context.switchToHttp().getRequest();
        const body = request.body;
        // Đọc ngẫu nhiên 1 ảnh từ thư mục
        const selectedFile = getRandomFile(defaultImageDir);

        // Chuyển đổi ảnh thành chuỗi Base64
        const ext = path.extname(selectedFile).toLowerCase();
        const base64 = convertImageToBase64(selectedFile);
        const base64Image = `data:image/${ext.replace('.', '')};base64,${base64}`;

        // Thêm ảnh Base64 vào dữ liệu phản hồi
        body.avatar = base64Image;

        return next.handle().pipe(
            map(data => {
                return {...data};
            }),
        );
    }
}
