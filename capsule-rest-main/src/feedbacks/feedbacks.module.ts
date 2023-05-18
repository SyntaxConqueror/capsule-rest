import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientProxyFactory, ClientsModule, Transport } from '@nestjs/microservices';
import FeedbacksController from './feedbacks.controller';


 
@Module({
  imports: [
        ConfigModule,
        ClientsModule.register([{
            name: "FEEDBACKS_SERVICE",
            transport: Transport.TCP
        }]) 
    ],
  controllers: [FeedbacksController],
  providers: [
    {
      provide: 'FEEDBACKS_SERVICE',
      useFactory: (configService: ConfigService) => (
        ClientProxyFactory.create({
          transport: Transport.TCP,
          options: {
            host: configService.get('FEEDBACKS_SERVICE_HOST'),
            port: configService.get('FEEDBACKS_SERVICE_PORT'),
          }
        })
      ),
      inject: [ConfigService],
    }
  ],
  
})
export class FeedbacksModule {}