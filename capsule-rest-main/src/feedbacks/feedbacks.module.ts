import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientProxyFactory, ClientsModule, Transport } from '@nestjs/microservices';
import FeedbacksController from './feedbacks.controller';


 
@Module({
  imports: [
        ConfigModule,
        ClientsModule.register([{
            name: "FEEDBACKS_SERVICE",
            transport: Transport.RMQ
        }]) 
    ],
  controllers: [FeedbacksController],
  providers: [
    {
      provide: 'FEEDBACKS_SERVICE',
      useFactory: (configService: ConfigService) => {
        const user = configService.get('RMQ_USER');
        const password = configService.get('RMQ_PASS');
        const host = configService.get('RMQ_HOST');
        const queueName = configService.get('RMQ_QUEUE_FEEDBACKS');
 
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
export class FeedbacksModule {}