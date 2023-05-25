import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GatewayModule } from './gateway/gateway.module';
import { SocketsController } from './sockets/sockets.controller';
import { SocketsModule } from './sockets/sockets.module';

@Module({
  imports: [ConfigModule.forRoot(), GatewayModule, SocketsModule],
  controllers: [SocketsController],
  providers: [],
})
export class AppModule {}
