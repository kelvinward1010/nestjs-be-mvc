import { BadRequestException, CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { map, Observable } from "rxjs";
import { CloudinaryService } from "src/cloud/cloudinary.providers";


@Injectable()
export class UploadCloudInterceptor implements NestInterceptor {
    constructor(private readonly cloudinaryService: CloudinaryService){}
    async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
        const request = context.switchToHttp().getRequest();
        const method = request.method;
        const files = request.files as Express.Multer.File[];
      
        const uploadResults = await Promise.all( 
            files.map(file => this.cloudinaryService.uploadImage(file)) 
        );
        const imageUrls = uploadResults.map(result => ({
                url: result.secure_url,
                public_id: result.public_id
        }));
        if(method === "POST"){
            if (!files || files.length === 0) { 
                throw new BadRequestException('No file provided'); 
            }
            request.body.images = imageUrls; 
        }else if(method === 'PUT' || method === 'PATCH'){
            if(!files || files.length === 0) {
                return next.handle().pipe(map(data => data))
            }
            request.body.newImages  = imageUrls;
        }

        return next.handle().pipe(map(data => data));
    }
}
