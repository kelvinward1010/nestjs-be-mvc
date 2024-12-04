import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { IPost, PostDocument } from "src/schemas/post.schema";
import { CreatePostDto } from "./dto/create-post.dto";
import { CloudinaryService } from "src/cloud/cloudinary.providers";



@Injectable()
export class PostService {
    constructor(
        @InjectModel(IPost.name) private postModel: Model<PostDocument>,
        private readonly cloudinaryService: CloudinaryService,
    ) {}

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
    
    async updatePost(id: string,updatePost: CreatePostDto): Promise<IPost> { 
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