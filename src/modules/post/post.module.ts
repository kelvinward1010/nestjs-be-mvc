import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { IPost, PostSchema } from "src/schemas/post.schema";
import { PostsController } from "./post.controller";
import { PostService } from "./post.service";
import { LoggerMiddleware } from "src/common/middleware/logger.middleware";
import { AuthModule } from "../auth/auth.module";
import { CloudinaryService } from "src/cloud/cloudinary.providers";
import { MulterModule } from "@nestjs/platform-express";
import { multerConfig } from "src/config/multer.config";



@Module({
    imports: [
        MongooseModule.forFeature([{ name: IPost.name, schema: PostSchema }]),
        AuthModule,
        MulterModule.register(multerConfig)
    ],
    controllers: [
        PostsController
    ],
    providers: [
        PostService, 
        CloudinaryService,
    ],
    exports: []
})
export class PostModule implements NestModule { 
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LoggerMiddleware).forRoutes(PostsController)
    }
}