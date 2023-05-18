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
            transport: Transport.TCP
        }]) 
    ],
  controllers: [CapsulesController],
  providers: [
    {
      provide: 'CAPSULES_SERVICE',
      useFactory: (configService: ConfigService) => (
        ClientProxyFactory.create({
          transport: Transport.TCP,
          options: {
            host: configService.get('CAPSULES_SERVICE_HOST'),
            port: configService.get('CAPSULES_SERVICE_PORT'),
          }
        })
      ),
      inject: [ConfigService],
    }
  ],
  
})
export class CapsulesModule {}