import { Module } from '@nestjs/common';

import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';
import { FilesModule } from './files/files.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientProxyFactory, ClientsModule, Transport } from '@nestjs/microservices';


@Module({
  imports: [
    UsersModule, 
    FilesModule,
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        AWS_REGION: process.env.AWS_REGION,
        AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
        AWS_SECRET_ACCESS_KEY:  process.env.AWS_SECRET_ACCESS_KEY,
        AWS_PUBLIC_BUCKET_NAME: process.env.AWS_PUBLIC_BUCKET_NAME
      })
    }),
    MongooseModule.forRoot(process.env.MONGO_DB),
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
      }
    ]),
  ],
  controllers: [UsersController],
  providers: []
})
export class AppModule {}
