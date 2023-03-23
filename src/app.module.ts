import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Mongoose } from 'mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { UsersController } from './users/users.controller';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { JwtService } from '@nestjs/jwt/dist';
import { UsersService } from './users/users.service';
import { FeedbackModule } from './feedbacks/modules/feedback.module';
import { CapsuleModule } from './capsules/modules/capsule-module';
import { CapsulesController } from './capsules/capsules.controller';
import { FeedbacksController } from './feedbacks/feedbacks.controller';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [
    UsersModule,
    AuthModule,
    FeedbackModule,
    CapsuleModule,
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_DB)
  ],
  controllers: [AppController, AuthController, CapsulesController, FeedbacksController],
  providers: [AppService],
})
export class AppModule {}
