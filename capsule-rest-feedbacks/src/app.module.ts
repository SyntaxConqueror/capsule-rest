import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { FeedbackModule } from './feedbacks/modules/feedback.module';
import { FeedbacksController } from './feedbacks/feedbacks.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_DB),
    FeedbackModule,
    ClientsModule.register([
      {
        name: "GATEWAY_SERVICE",
        transport: Transport.RMQ,
        options: {
          urls: [`amqp://${process.env.RMQ_USER}:${process.env.RMQ_USER}@${process.env.RMQ_HOST}`],
          queue: process.env.RMQ_QUEUE_WEBSOCKETS,
          queueOptions: {
            durable: true,
          }
        }
      }
    ]),
  ],
  controllers: [FeedbacksController],
  providers: [],
})
export class AppModule {}
