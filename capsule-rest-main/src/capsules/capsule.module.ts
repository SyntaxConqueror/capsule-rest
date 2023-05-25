import { Module } from '@nestjs/common';
import UsersController from '../users/users.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientProxyFactory, ClientsModule, Transport } from '@nestjs/microservices';
import CapsulesController from './capsules.controller';


 
@Module({
  imports: [
        ConfigModule,
        ClientsModule.register([{
            name: "CAPSULES_SERVICE",
            transport: Transport.RMQ
        }]) 
    ],
  controllers: [CapsulesController],
  providers: [
    {
      provide: 'CAPSULES_SERVICE',
      useFactory: (configService: ConfigService) => {
        const user = configService.get('RMQ_USER');
        const password = configService.get('RMQ_PASS');
        const host = configService.get('RMQ_HOST');
        const queueName = configService.get('RMQ_QUEUE_CAPSULES');
 
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
    }
  ],
  
})
export class CapsulesModule {}