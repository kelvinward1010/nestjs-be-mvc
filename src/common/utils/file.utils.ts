import * as fs from 'fs';
import * as path from 'path';

/**
 * Đọc một tệp tin hình ảnh từ một đường dẫn và chuyển đổi nó sang Base64.
 * @param filePath Đường dẫn đến tệp tin hình ảnh.
 * @returns Chuỗi Base64 của tệp tin hình ảnh.
 */
export function convertImageToBase64(filePath: string): string {
    const fileBuffer = fs.readFileSync(filePath);
    return fileBuffer.toString('base64');
}

/**
 * Đọc danh sách tệp trong thư mục và chọn ngẫu nhiên một tệp.
 * @param dirPath Đường dẫn đến thư mục.
 * @returns Đường dẫn của tệp được chọn ngẫu nhiên.
 */
export function getRandomFile(dirPath: string): string {
    const files = fs.readdirSync(dirPath).filter(file => {
        const ext = path.extname(file).toLowerCase();
        return ext === '.png' || ext === '.jpg' || ext === '.jpeg'; // Chỉ chọn các tệp hình ảnh
    });

    if (files.length === 0) {
        throw new Error('No image files found in the directory');
    }

    const randomIndex = Math.floor(Math.random() * files.length);
    const selectedFile = files[randomIndex];

    return path.join(dirPath, selectedFile);
}
