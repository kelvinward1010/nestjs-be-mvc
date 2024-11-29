import { forwardRef, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { LoggerMiddleware } from 'src/common/middleware/logger.middleware';
import { UserModule } from '../user/user.module';
import { AuthService } from './auth.service';
import { AuthHelper } from 'src/common/helpers/auth.helper';
import { RolesGuard } from 'src/common/guards/role.guard';

@Module({
    imports: [
        forwardRef(() => UserModule),
        PassportModule,
        JwtModule.register({
            secret: 'KelvinWard1010',
            signOptions: { expiresIn: '60m' },
        }),
    ],
    controllers: [AuthController],
    providers: [
        AuthService, 
        JwtStrategy, 
        AuthHelper,
        RolesGuard
    ],
    exports: [AuthService, AuthHelper, JwtModule, RolesGuard]
})
export class AuthModule implements NestModule { 
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LoggerMiddleware).forRoutes(AuthController)
    }
}
