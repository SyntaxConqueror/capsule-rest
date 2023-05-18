
import { Module } from '@nestjs/common';
import UsersController from '../users/users.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientProxyFactory, ClientsModule, Transport } from '@nestjs/microservices';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './user.schema';
import { PublicFileSchema } from 'src/files/entities/publicFile.schema';

 
@Module({
  imports: [
    MongooseModule.forFeature([{
      name: "User", schema: UserSchema
    }, {name: "PublicFile", schema: PublicFileSchema}]),
        ConfigModule,
        
        ClientsModule.register([{
            name: "USERS_SERVICE",
            transport: Transport.TCP
        }]) 
    ],
  controllers: [UsersController],
  providers: [
    {
      provide: 'USERS_SERVICE',
      useFactory: (configService: ConfigService) => (
        ClientProxyFactory.create({
          transport: Transport.TCP,
          options: {
            host: configService.get('USERS_SERVICE_HOST'),
            port: configService.get('USERS_SERVICE_PORT'),
          }
        })
      ),
      inject: [ConfigService],
    }
  ],
  
})
export class UsersModule {}