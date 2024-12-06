import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
        isGlobal: true,
        cache: true,
    })
  ],
  exports: [ConfigModule],
})
export class AppConfigModule {}
