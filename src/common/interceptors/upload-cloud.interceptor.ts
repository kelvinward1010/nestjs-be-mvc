import { BadRequestException, CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { map, Observable } from "rxjs";
import { CloudinaryService } from "src/cloud/cloudinary.providers";


@Injectable()
export class UploadCloudInterceptor implements NestInterceptor {
    constructor(private readonly cloudinaryService: CloudinaryService){}
    async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
        const request = context.switchToHttp().getRequest();
        const files = request.files as Express.Multer.File[];
        if (!files || files.length === 0) { 
            throw new BadRequestException('No file provided'); 
        } 
        const uploadResults = await Promise.all( 
            files.map(file => this.cloudinaryService.uploadImage(file)) 
        );
        const imageUrls = uploadResults.map(result => ({
                url: result.secure_url,
                public_id: result.public_id
        }));
        request.body.images = imageUrls; 
        return next.handle().pipe(map(data => data) );
    }
}
