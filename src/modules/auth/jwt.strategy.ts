import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: 'KelvinWard1010',
        });
    }

    async validate(
        payload: any,
        username?: string, 
        password?: string
    ): Promise<any> {
        // const user = await this.authService.validateUser(username, password);
        // if(!user) {
        //     throw new UnauthorizedException(username + ' is not authorized')
        // }
        // return user;
        return { userId: payload.sub, username: payload.username };
    }
}

/*
- @Injectable(): Decorator này cho biết rằng JwtStrategy có thể được 
tiêm vào các class khác thông qua dependency injection.

- PassportStrategy(Strategy): JwtStrategy mở rộng từ PassportStrategy 
và sử dụng Strategy từ passport-jwt. Điều này giúp bạn dễ dàng tích hợp JWT với Passport.js.

- constructor: Hàm khởi tạo này gọi super() với cấu hình cho JWT strategy.

- jwtFromRequest: Xác định rằng JWT sẽ được trích xuất từ header Authorization 
dưới dạng Bearer token.

- ignoreExpiration: Xác định rằng JWT không nên bị hết hạn 
(false có nghĩa là JWT hết hạn sẽ bị từ chối).

- secretOrKey: Khóa bí mật được sử dụng để xác thực chữ ký JWT.

- validate(payload: any): Hàm này xác thực JWT. Nếu JWT hợp lệ, 
nó trả về một đối tượng chứa userId và username. Hàm này được Passport.jsgọi tự động sau khi xác thực token thành công. */