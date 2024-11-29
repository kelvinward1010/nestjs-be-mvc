import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { createResponse } from 'src/common/utils/response.util';
import { RolesGuard } from 'src/common/guards/role.guard';

@Controller('auth')
@UseGuards(RolesGuard)
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('login')
    async login(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto).then((res) => createResponse(200, "success", {access_token: res.access_token}));
    }
}
