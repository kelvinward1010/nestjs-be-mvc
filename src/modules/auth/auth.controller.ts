import { Controller, Post, Body, UseInterceptors, Res, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { createResponse } from 'src/common/utils/response.util';
import { SignUpDto } from './dto/signup.dto';
import { BodyCheckInterceptor } from 'src/common/interceptors/body-check.interceptor';
import { Request, Response } from 'express';

@Controller('auth')
@UseInterceptors(BodyCheckInterceptor)
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('signup')
    async signup(@Body() data: SignUpDto) {
        const user = await this.authService.register(data);
        return createResponse(201, 'success', user); 
    }

    @Post('login')
    async login(@Body() loginDto: LoginDto, @Res() res: Response) {
        const data = await this.authService.login(loginDto, res);
        const response = createResponse(200, "success", {access_token: data.access_token, refresh_token: data.refresh_token});
        return res.json(response);
    }

    @Post('refresh-token') 
    async refreshToken(@Req() req: Request, @Res() res: Response) { 
        const tokens = await this.authService.refreshToken(req); 
        return res.json(tokens);
    }
}
