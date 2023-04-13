import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { AuthController } from './auth/auth.controller';
import { FeedbackModule } from './feedbacks/modules/feedback.module';
import { CapsuleModule } from './capsules/modules/capsule-module';
import { CapsulesController } from './capsules/capsules.controller';
import { FeedbacksController } from './feedbacks/feedbacks.controller';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { HttpModule, HttpService } from '@nestjs/axios';
import { FilesModule } from './files/files.module';


@Module({
  imports: [
    UsersModule,
    AuthModule,
    FeedbackModule,
    CapsuleModule,
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        AWS_REGION: process.env.AWS_REGION,
        AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
        AWS_SECRET_ACCESS_KEY:  process.env.AWS_SECRET_ACCESS_KEY,
        AWS_PUBLIC_BUCKET_NAME: process.env.AWS_PUBLIC_BUCKET_NAME
      })
    }),
    MongooseModule.forRoot(process.env.MONGO_DB),
    HttpModule,
    FilesModule
  ],
  controllers: [AppController, AuthController, CapsulesController, FeedbacksController],
  providers: [AppService],
})
export class AppModule {}
