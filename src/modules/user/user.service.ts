import { ConflictException, Injectable, NotFoundException, Scope } from "@nestjs/common";
import { ModuleRef } from "@nestjs/core";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { AuthHelper } from "src/common/helpers/auth.helper";
import { User, UserDocument } from "src/schemas/user.schema";
import { AuthValidatorService } from "../auth/auth-validator.service";




@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        private readonly authService: AuthHelper,
        private readonly moduleRef: ModuleRef,
    ) {}

    async createUser(name: string, password: string, email: string, age: number,): Promise<User> {
        const authValidator = await this.moduleRef.resolve(AuthValidatorService);
        authValidator.validateCreationRequest({name,email, password, age})
        
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

    async findByEmail(email: string): Promise<User | undefined> {
        const user = await this.userModel.findOne({email}).exec();
        if(!user){
            throw new NotFoundException(`User ${email} does not exist`)
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