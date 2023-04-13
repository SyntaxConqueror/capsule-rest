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
