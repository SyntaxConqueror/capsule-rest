import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { AuthController } from './auth/auth.controller';
import { CapsulesModule } from './capsules/capsules.module';
import { FeedbacksController } from './feedbacks/feedbacks.controller';
import { FeedbacksModule } from './feedbacks/feedbacks.module';
import { CapsulesController } from './capsules/capsules.controller';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UsersModule,
    AuthModule,
    MongooseModule.forRoot(process.env.MONGO_DB),
    CapsulesModule,
    FeedbacksModule
  ],
  controllers: [UsersController, AuthController, CapsulesController, FeedbacksController],
  providers: [],
})
export class AppModule {}
