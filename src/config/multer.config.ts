import * as multer from 'multer';
import { extname } from 'path';

export const multerConfig = {
    storage: multer.diskStorage({
        destination: './uploads', // Đường dẫn lưu trữ file upload
        filename: (req, file, cb) => {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
            const ext = extname(file.originalname);
            cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
        },
    }),
    fileFilter: (req, file, cb) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
            return cb(new Error('Only image files are allowed!'), false);
        }
        cb(null, true);
    },
    limits: {
        fileSize: 2 * 1024 * 1024, // Giới hạn kích thước file 2MB
    },
};
