
import { Module } from '@nestjs/common';
import UsersController from '../users/users.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientProxyFactory, ClientsModule, Transport } from '@nestjs/microservices';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './user.schema';
import { PublicFileSchema } from 'src/files/entities/publicFile.schema';
import { Server } from 'socket.io';


 
@Module({
  imports: [
    MongooseModule.forFeature([{
      name: "User", schema: UserSchema
    }, {name: "PublicFile", schema: PublicFileSchema}]),
        ConfigModule,
        
        ClientsModule.register([
          {
            name: "USERS_SERVICE",
            transport: Transport.RMQ
          },
          
        ]),
        
    ],
  controllers: [UsersController],
  providers: [
    UsersController,
    {
      provide: 'USERS_SERVICE',
      useFactory: (configService: ConfigService) => {
        const user = configService.get('RMQ_USER');
        const password = configService.get('RMQ_PASS');
        const host = configService.get('RMQ_HOST');
        const queueName = configService.get('RMQ_QUEUE_USERS');
 
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
})
export class UsersModule {}