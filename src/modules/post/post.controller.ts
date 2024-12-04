import { BadRequestException, Body, Controller, Delete, Get, Param, Patch, Post, Put, UploadedFiles, UseGuards, UseInterceptors } from "@nestjs/common";
import { PostService } from "./post.service";
import { BodyCheckInterceptor } from "src/common/interceptors/body-check.interceptor";
import { CreatePostDto } from "./dto/create-post.dto";
import { ResponseDto } from "src/common/dto/response.dto";
import {IPost}  from "src/schemas/post.schema";
import { createResponse } from "src/common/utils/response.util";
import { RolesAdminGuard } from "src/common/guards/role.guard.admin";
import { FilesInterceptor } from "@nestjs/platform-express";
import { multerConfig } from "src/config/multer.config";
import { UploadCloudInterceptor } from "src/common/interceptors/upload-cloud.interceptor";
import { UpdatePostDto } from "./dto/update-post.dto";



@Controller('posts')
@UseGuards(RolesAdminGuard)
@UseInterceptors(BodyCheckInterceptor)
export class PostsController {
    constructor(
        private readonly postService: PostService,
    ) {}

    @Post()
    @UseInterceptors(FilesInterceptor('images', 10, multerConfig), UploadCloudInterceptor)
    async create(
        @Body() createPostDto: CreatePostDto,
    ): Promise<ResponseDto<IPost>> {
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

    @Patch(':id')
    @UseInterceptors(FilesInterceptor('newImages', 10, multerConfig), UploadCloudInterceptor)
    async update(
        @Param('id') id: string,
        @Body() updatePostDto: UpdatePostDto
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