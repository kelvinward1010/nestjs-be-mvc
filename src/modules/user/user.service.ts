import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { AuthService } from "src/auth/auth.service";
import { User, UserDocument } from "src/schemas/user.schema";




@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        private readonly authService: AuthService
    ) {}

    async createUser(name: string, password: string, email: string, age: number,): Promise<User> {

        const existingUser = await this.userModel.findOne({ email }); 
        if (existingUser) { 
            throw new ConflictException('Email already exists'); 
        }

        const hashedPassword = await this.authService.hashPassword(password);
        const newUser = new this.userModel({ name, password: hashedPassword, email, age }); 
        return newUser.save();
    }

    async findAll(): Promise<User[]> { 
        return this.userModel.find().exec(); 
    }

    async findOne(id: string): Promise<User> { 
        const user = await this.userModel.findById(id).exec();
        if(!user){
            throw new NotFoundException(`User ${id} does not exist`)
        }

        return user; 
    } 
    
    async updateUser(id: string, name: string, password: string, email: string, age: number): Promise<User> { 
        return this.userModel.findByIdAndUpdate(id, { name, password, email, age }, { new: true }).exec(); 
    } 
    
    async deleteUser(id: string): Promise<User> { 
        return this.userModel.findByIdAndDelete(id).exec(); 
    }
}