import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { UploadApiErrorResponse, UploadApiResponse } from 'cloudinary';
import { promises as fs } from 'fs';

@Injectable()
export class CloudinaryService {
    async uploadImage(
        file: Express.Multer.File,
    ): Promise<UploadApiResponse | UploadApiErrorResponse> {
        return new Promise((resolve, reject) => {
            cloudinary.uploader.upload(
                file.path,
                { resource_type: 'image', folder: 'posts' },
                async (error, result) => {
                    if (error) {
                        reject(error);
                    } else {
                        try {
                            await this.deleteLocalFile(file.path)
                            console.log(`File ${file.path} đã được xóa.`);
                        } catch (error) {
                            console.log("Lỗi khi xóa file tạm", error)
                        }
                        resolve(result);
                    }
                },
            );
        });
    }

    async deleteLocalFile(filePath: string): Promise<void> { 
        try { 
            await fs.unlink(filePath); // Xóa file tạm 
        } catch (err) { 
            console.error('Error deleting temporary file:', err); 
        } 
    }

    async deleteImageOnCloud(public_id: string): Promise<void>{
        await cloudinary.uploader.destroy(public_id)
    }
}
