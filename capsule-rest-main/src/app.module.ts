import { Module } from '@nestjs/common';
import UsersController from './users/users.controller';
import { UsersModule } from './users/users.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { AuthController } from './auth/auth.controller';
import { FilesModule } from './files/files.module';
import CapsulesController from './capsules/capsules.controller';
import { CapsulesModule } from './capsules/capsule.module';
import { FeedbacksModule } from './feedbacks/feedbacks.module';
import FeedbacksController from './feedbacks/feedbacks.controller';





@Module({
  imports: [
    ConfigModule.forRoot(),
    UsersModule,
    AuthModule,
    FilesModule,
    CapsulesModule,
    FeedbacksModule,
    ClientsModule.register([
      {
        name: "USERS_SERVICE",
        transport: Transport.RMQ,
        options: {
          urls: [`amqp://${process.env.RMQ_USER}:${process.env.RMQ_USER}@${process.env.RMQ_HOST}`],
          queue: process.env.RMQ_QUEUE_USERS,
          queueOptions: {
            durable: true,
          }
        }
      },
      {
        name: "CAPSULES_SERVICE",
        transport: Transport.RMQ,
        options: {
          urls: [`amqp://${process.env.RMQ_USER}:${process.env.RMQ_USER}@${process.env.RMQ_HOST}`],
          queue: process.env.RMQ_QUEUE_CAPSULES,
          queueOptions: {
            durable: true,
          }
        }
      },
      {
        name: "FEEDBACKS_SERVICE",
        transport: Transport.RMQ,
        options: {
          urls: [`amqp://${process.env.RMQ_USER}:${process.env.RMQ_USER}@${process.env.RMQ_HOST}`],
          queue: process.env.RMQ_QUEUE_FEEDBACKS,
          queueOptions: {
            durable: true,
          }
        }
      },
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
      },
      {
        name: "ES_SERVICE",
        transport: Transport.RMQ,
        options: {
          urls: [`amqp://${process.env.RMQ_USER}:${process.env.RMQ_USER}@${process.env.RMQ_HOST}`],
          queue: process.env.RMQ_QUEUE_ES,
          queueOptions: {
            durable: true,
          }
        }
      },
  ]), 
    MongooseModule.forRoot(process.env.MONGO_DB)
  ],
  controllers: [UsersController, AuthController, CapsulesController, FeedbacksController],
  providers: [],
})
export class AppModule {}
