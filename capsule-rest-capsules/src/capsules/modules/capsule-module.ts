// user.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CapsulesController } from '../capsules.controller';
import { Capsule, capsuleSchema } from '../schemas/capsule.schema';
import { CapsuleService } from '../service/capsule.service';
import { HttpModule } from '@nestjs/axios'; 
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientProxyFactory, ClientsModule, Transport } from '@nestjs/microservices';


@Module({
    imports:[
        MongooseModule.forFeature([{
            name: Capsule.name, schema: capsuleSchema
        }]), HttpModule, ConfigModule.forRoot(),
        ClientsModule.register([
            {
              name: "GATEWAY_SERVICE",
              transport: Transport.RMQ
            },
        ]),
    ],
    controllers: [CapsulesController],
    providers: [
        CapsuleService, 
        ConfigService,
        {
            provide: 'GATEWAY_SERVICE',
            useFactory: (configService: ConfigService) => {
              const user = process.env.RMQ_USER;
              const password = process.env.RMQ_PASS;
              const host = process.env.RMQ_HOST;
              const queueName = process.env.RMQ_QUEUE_WEBSOCKETS;
       
              return ClientProxyFactory.create({
                transport: Transport.RMQ,
                options: {
                  urls: [`amqp://${user}:${password}@${host}`],
                  queue: queueName,
                  queueOptions: {
                    durable: true,
                  },
                },
              })
            },
            
            inject: [ConfigService],
          },
    ],
    exports:[CapsuleService]
})
export class CapsuleModule {}