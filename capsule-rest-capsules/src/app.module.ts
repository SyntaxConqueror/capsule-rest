import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
import { CapsuleModule } from './capsules/modules/capsule-module';
import { CapsulesController } from './capsules/capsules.controller';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_DB),
    CapsuleModule,
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
    ])
  ],
  controllers: [CapsulesController],
  providers: [
    
  ],
})
export class AppModule {}
