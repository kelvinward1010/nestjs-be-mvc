import { ConflictException, Inject, Injectable, OnModuleInit, UnauthorizedException } from '@nestjs/common';
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
import { Request, Response } from 'express';

@Injectable()
export class AuthService implements OnModuleInit {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        private authHelper: AuthHelper,
        private readonly userService: UserService,
        @Inject('AccessJwtService') private accessJwtService: JwtService, 
        @Inject('RefreshJwtService') private refreshJwtService: JwtService,
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

    async login(loginDto: LoginDto, res: Response) {
        const user = await this.validateUser(loginDto.email, loginDto.password);
        if (!user._doc) {
            throw new UnauthorizedException('Invalid credentials');
        }
        const transferUser = user._doc;

        const payload = { username: transferUser.name, sub: transferUser._id, roles: transferUser.roles };
        const access_token = this.accessJwtService.sign(payload); 
        const refresh_token = this.refreshJwtService.sign(payload);

        res.cookie('refresh_token', refresh_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Chỉ gửi cookie qua HTTPS nếu môi trường là production
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
            sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
        })

        return {access_token, refresh_token};
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

    async refreshToken(req: Request): Promise<any> {
        const refreshToken = req.cookies['refresh_token'];
        if(!refreshToken){
            throw new UnauthorizedException('Refresh token not found');
        }
        
        try {
            const decoded = this.refreshJwtService.verify(refreshToken, { secret: process.env.REFRESH_SECRET_KEY });
            const payload = { username: decoded.username, sub: decoded.sub, roles: decoded.roles};
            const access_token = this.accessJwtService.sign(payload);
            return { access_token }
        }catch (err) {
            throw new UnauthorizedException('Invalid refresh token');
        }
    }
}
