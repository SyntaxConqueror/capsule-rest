import { Module } from '@nestjs/common';
import { FeedbacksController } from './feedbacks/feedbacks.controller';
import { ConfigModule } from '@nestjs/config';
import { FeedbackModule } from './feedbacks/modules/feedback.module';
import { MongooseModule } from '@nestjs/mongoose';


@Module({
  imports: [
    ConfigModule.forRoot(),
    FeedbackModule,
    MongooseModule.forRoot(process.env.MONGO_DB)
  ],
  controllers: [FeedbacksController],
  providers: [],
})
export class AppModule {}
