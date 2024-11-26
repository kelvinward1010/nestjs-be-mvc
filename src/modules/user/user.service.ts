import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User, UserDocument } from "src/schemas/user.schema";




@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

    async createUser(name: string, age: number, email: string): Promise<User> {
        const newUser = new this.userModel({ name, age, email }); 
        return newUser.save();
    }

    async findAll(): Promise<User[]> { 
        return this.userModel.find().exec(); 
    }
}