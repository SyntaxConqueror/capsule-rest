import { Module } from '@nestjs/common';
import { UsersSearchModule } from './users-search/users-search.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UsersSearchModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
