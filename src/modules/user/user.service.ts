import { ConflictException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User, UserDocument } from "src/schemas/user.schema";




@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

    async createUser(name: string, age: number, email: string): Promise<User> {

        const existingUser = await this.userModel.findOne({ email }); 
        if (existingUser) { 
            throw new ConflictException('Email already exists'); 
        }

        const newUser = new this.userModel({ name, age, email }); 
        return newUser.save();
    }

    async findAll(): Promise<User[]> { 
        return this.userModel.find().exec(); 
    }

    async findOne(id: string): Promise<User> { 
        return this.userModel.findById(id).exec(); 
    } 
    
    async updateUser(id: string, name: string, age: number, email: string): Promise<User> { 
        return this.userModel.findByIdAndUpdate(id, { name, age, email }, { new: true }).exec(); 
    } 
    
    async deleteUser(id: string): Promise<User> { 
        return this.userModel.findByIdAndDelete(id).exec(); 
    }
}