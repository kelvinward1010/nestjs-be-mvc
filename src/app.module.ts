import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { AppConfigModule } from './config/config.module';
import { AuthLazyModule, LazyModuleWrapper, UsersLazyModule } from './lazy.module.wrapper';
import { PostModule } from './modules/post/post.module';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [AppConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('URL_DB')
      }),
      //Đảm bảo rằng ConfigService được inject vào factory function để có thể sử dụng nó.
      inject: [ConfigService]
    }),
    AuthLazyModule,
    UsersLazyModule,
    //PostModule,
    AppConfigModule,
    LazyModuleWrapper.forRoot('./modules/post/post.module', 'PostModule'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

