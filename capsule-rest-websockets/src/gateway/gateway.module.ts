import { Module } from '@nestjs/common';
import { GatewayService } from './gateway.service';
import { SocketsController } from 'src/sockets/sockets.controller';

@Module({
  providers: [GatewayService],
  controllers:[SocketsController]
})
export class GatewayModule {}
