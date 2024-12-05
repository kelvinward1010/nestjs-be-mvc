import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { IPost, PostDocument } from "src/schemas/post.schema";
import { CreatePostDto } from "./dto/create-post.dto";
import { CloudinaryService } from "src/cloud/cloudinary.providers";
import { UpdatePostDto } from "./dto/update-post.dto";

// Trong Mongoose, exec() là một phương thức được sử dụng để thực thi các truy vấn MongoDB và trả về một Promise. Việc sử dụng exec() giúp bạn có thể dễ dàng sử dụng cú pháp async/await hoặc .then()/.catch() để xử lý kết quả của truy vấn.

@Injectable()
export class PostService {
    constructor(
        @InjectModel(IPost.name) private postModel: Model<PostDocument>,
        private readonly cloudinaryService: CloudinaryService,
    ) {}

    async searchPosts(query: string): Promise<IPost[]> { 
        const posts = await this.postModel.find({ 
            $or: [ 
                { title: { $regex: query, $options: 'i' } }, 
                { content: { $regex: query, $options: 'i' } }, 
                // { _id: query } 
            ] }).exec(); 
        return posts; 
    }

    async createPost(createPostDto: CreatePostDto): Promise<IPost> {
        const newPost = new this.postModel(createPostDto); 
        return newPost.save();
    }

    async findAll(): Promise<IPost[]> { 
        return this.postModel.find().exec(); 
    }

    async findOne(id: string): Promise<IPost> { 
        const post = await this.postModel.findById(id).exec();
        if(!post){
            throw new NotFoundException(`Post ${id} does not exist`)
        }

        return post; 
    }
    
    async updatePost(id: string,updatePost: UpdatePostDto): Promise<IPost> { 
        const existingPost = await this.postModel.findById(id)
        if(!existingPost){
            throw new NotFoundException(`Post ${id} does not exist`)
        }

        const imagesKeep = updatePost.images ?? [];
        const newImages = updatePost.newImages ?? [];

        const imagesToDelete = existingPost.images.filter((img: any) => !imagesKeep.includes(img.public_id))
        await Promise.all(imagesToDelete.map(img => this.cloudinaryService.deleteImageOnCloud(img.public_id)))

        updatePost.images = [
            ...existingPost.images.filter((img: any) => imagesKeep.length > 0 ? imagesKeep.includes(img.public_id) : !imagesKeep.includes(img.public_id)),
            ...newImages,
        ]

        return this.postModel.findByIdAndUpdate(id, updatePost, { new: true }).exec(); 
    } 
    
    async deletePost(id: string): Promise<IPost> { 
        const data = await this.postModel.findByIdAndDelete(id)
        data.images.forEach(async (image) => {
            await this.cloudinaryService.deleteImageOnCloud(image.public_id)
        })
        return data;  
    }
}