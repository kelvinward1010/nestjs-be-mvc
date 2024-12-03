import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, UseInterceptors } from "@nestjs/common";
import { PostService } from "./post.service";
import { BodyCheckInterceptor } from "src/common/interceptors/body-check.interceptor";
import { CreatePostDto } from "./dto/create-post.dto";
import { ResponseDto } from "src/common/dto/response.dto";
import {IPost}  from "src/schemas/post.schema";
import { createResponse } from "src/common/utils/response.util";
import { RolesAdminGuard } from "src/common/guards/role.guard.admin";



@Controller('posts')
@UseGuards(RolesAdminGuard)
@UseInterceptors(BodyCheckInterceptor)
export class PostsController {
    constructor(
        private readonly postService: PostService,
        //private readonly cloudinaryService: CloudinaryService,
    ) {}

    @Post()
    //@UseInterceptors(FilesInterceptor('image', 10, multerConfig))
    async create(
        @Body() createPostDto: CreatePostDto,
        //@UploadedFiles() files: Express.Multer.File[],
    ): Promise<ResponseDto<IPost>> {
        // if (!files || files.length === 0) { 
        //     throw new BadRequestException('No file provided'); 
        // } 
        // const uploadResults = await Promise.all( 
        //     files.map(file => this.cloudinaryService.uploadImage(file)) 
        // );
        // const imageUrls = uploadResults.map(result => result.secure_url);
        // console.log(imageUrls)
        // createProductDto.images = [
        //   { url: result.secure_url, uri: result.public_id },
        // ];
        const post = await this.postService.createPost(createPostDto);
        return createResponse(201, 'success', post); 
    }

    @Get()
    async findAll(): Promise<ResponseDto<IPost[]>> {
        const posts = await this.postService.findAll();
        return createResponse(200, 'success', posts);
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<ResponseDto<IPost>> {
        const post = await this.postService.findOne(id);
        return createResponse(200, 'success', post);
    }

    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body() updatePostDto: CreatePostDto
    ): Promise<ResponseDto<IPost>> {
        const postUpdate = await this.postService.updatePost(id, updatePostDto);
        return createResponse(200, 'success', postUpdate);
    }

    @Delete(':id')
    async remove(@Param('id') id: string): Promise<ResponseDto<IPost>> { 
        const postDelete = await this.postService.deletePost(id);
        return createResponse(200, 'success', postDelete);
    }
}