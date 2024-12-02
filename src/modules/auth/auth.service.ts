import { ConflictException, Injectable, OnModuleInit, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { AuthHelper } from 'src/common/helpers/auth.helper';
import { ModuleRef } from '@nestjs/core';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/schemas/user.schema';
import { Model } from 'mongoose';
import { AuthValidatorService } from './auth-validator.service';
import { SignUpDto } from './dto/signup.dto';

@Injectable()
export class AuthService implements OnModuleInit {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        private authHelper: AuthHelper,
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
        private readonly moduleRef: ModuleRef,
    ) { }

    onModuleInit(){
        this.authHelper = this.moduleRef.get(AuthHelper, { strict: false});
    }

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.userService.findByEmail(email);
        if (user && await this.authHelper.comparePassword(password, user.password)) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async login(loginDto: LoginDto) {
        const user = await this.validateUser(loginDto.email, loginDto.password);
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }
        const payload = { username: user.username, sub: user.id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    async register(data: SignUpDto) {
        const authValidator = await this.moduleRef.resolve(AuthValidatorService);
        authValidator.validateCreationRequest(data)
        
        const existingUser = await this.userModel.findOne({ email: data.email }); 
        if (existingUser) { 
            throw new ConflictException('Email already exists'); 
        }

        const hashedPassword = await this.authHelper.hashPassword(data.password);
        const newUser = new this.userModel({ ...data, password: hashedPassword }); 
        return newUser.save();
    }
}
