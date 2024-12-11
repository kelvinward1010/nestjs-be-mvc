import { forwardRef, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { LoggerMiddleware } from 'src/common/middleware/logger.middleware';
import { UserModule } from '../user/user.module';
import { AuthService } from './auth.service';
import { AuthHelper } from 'src/common/helpers/auth.helper';
import { RoleGuard } from 'src/common/guards/role.guard';
import { AuthValidatorService } from './auth-validator.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schemas/user.schema';
import { AccessJwtProvider, RefreshJwtProvider } from 'src/config/jwt.config';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        forwardRef(() => UserModule),
        PassportModule,
        JwtModule.register({}),
    ],
    controllers: [AuthController],
    providers: [
        AuthService, 
        JwtStrategy, 
        AuthHelper,
        RoleGuard,
        AuthGuard,
        RolesGuard,
        AuthValidatorService,
        AccessJwtProvider,
        RefreshJwtProvider,
    ],
    exports: [AuthService, AuthHelper, JwtModule, RoleGuard, 'AccessJwtService', 'RefreshJwtService']
})
export class AuthModule implements NestModule { 
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LoggerMiddleware).forRoutes(AuthController)
    }
}

/* 
export class AuthModule implements NestModule:
export class AuthModule: Khai báo và xuất lớp AuthModule để có thể sử dụng ở các module khác.
implements NestModule: Định nghĩa rằng AuthModule thực thi giao diện NestModule. 
Điều này yêu cầu lớp phải cài đặt phương thức configure.

- configure(consumer: MiddlewareConsumer): Định nghĩa phương thức configure, 
nơi cấu hình middleware được thực hiện. MiddlewareConsumer là một đối tượng được 
sử dụng để áp dụng middleware cho các route cụ thể.

- consumer.apply(LoggerMiddleware): Áp dụng middleware LoggerMiddleware 
cho các route được chỉ định.
- forRoutes(AuthController): Chỉ định rằng middleware LoggerMiddleware 
sẽ được áp dụng cho tất cả các route được định nghĩa trong AuthController.

Ý nghĩa và ứng dụng:
- AuthModule: Là một module trong ứng dụng NestJS, 
có thể chứa các thành phần như controllers, services, và middleware liên quan đến chức năng xác thực (authentication).
- NestModule: Là một giao diện từ NestJS yêu cầu cài đặt phương thức configure 
để cấu hình middleware.
- configure Method: Được sử dụng để áp dụng middleware cho các route cụ thể trong ứng dụng. 
Trong ví dụ này, LoggerMiddleware sẽ được áp dụng cho tất cả các route trong AuthController.
*/