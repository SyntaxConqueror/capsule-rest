import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './user.schema';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { HttpModule } from '@nestjs/axios'; 
import { FilesService } from 'src/files/files.service';
import { FilesModule } from 'src/files/files.module';
import { PublicFileSchema } from 'src/files/entities/publicFile.schema';
import { ConfigService } from 'aws-sdk';
import { ConfigModule } from '@nestjs/config';
import { ClientProxyFactory, ClientsModule, Transport } from '@nestjs/microservices';


@Module({
  imports: [
    MongooseModule.forFeature([{
      name: "User", schema: UserSchema
    }, {name: "PublicFile", schema: PublicFileSchema}]), 
    HttpModule, 
    ConfigModule.forRoot(),
    ClientsModule.register([
      {
        name: "GATEWAY_SERVICE",
        transport: Transport.RMQ
      },
      {
        name: "ES_SERVICE",
        transport: Transport.RMQ
      }
    ]),
  ],
  controllers: [UsersController],
  providers: [
    UsersService, 
    FilesService,
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
    {
      provide: 'ES_SERVICE',
      useFactory: (configService: ConfigService) => {
        const user = process.env.RMQ_USER;
        const password = process.env.RMQ_PASS;
        const host = process.env.RMQ_HOST;
        const queueName = process.env.RMQ_QUEUE_ES;
 
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
  exports:[UsersService]
})
export class UsersModule {}
