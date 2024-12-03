import { forwardRef, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { LoggerMiddleware } from 'src/common/middleware/logger.middleware';
import { UserModule } from '../user/user.module';
import { AuthService } from './auth.service';
import { AuthHelper } from 'src/common/helpers/auth.helper';
import { RolesGuard } from 'src/common/guards/role.guard';
import { AuthValidatorService } from './auth-validator.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schemas/user.schema';
import { AccessJwtProvider, RefreshJwtProvider } from 'src/config/jwt.config';

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
        RolesGuard,
        AuthValidatorService,
        AccessJwtProvider,
        RefreshJwtProvider,
    ],
    exports: [AuthService, AuthHelper, JwtModule, RolesGuard, 'AccessJwtService', 'RefreshJwtService']
})
export class AuthModule implements NestModule { 
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LoggerMiddleware).forRoutes(AuthController)
    }
}
