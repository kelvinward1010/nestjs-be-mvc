import { forwardRef, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from './user.service';
import { User, UserSchema } from 'src/schemas/user.schema';
import { UsersController } from './user.controller';
import { LoggerMiddleware } from 'src/common/middleware/logger.middleware';
import { AuthModule } from '../auth/auth.module';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        forwardRef(() => AuthModule),
    ],
    controllers: [UsersController],
    providers: [
        UserService,
    ],
    exports: [UserService]
})
export class UserModule implements NestModule { 
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LoggerMiddleware).forRoutes(UsersController)
    }
}
