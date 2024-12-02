import { Controller, Post, Body, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { createResponse } from 'src/common/utils/response.util';
import { SignUpDto } from './dto/signup.dto';
import { BodyCheckInterceptor } from 'src/common/interceptors/body-check.interceptor';

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
    async login(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto).then((res) => createResponse(200, "success", {access_token: res.access_token}));
    }
}
