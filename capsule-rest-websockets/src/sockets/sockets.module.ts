import { Controller, Module } from '@nestjs/common';
import { SocketsController } from './sockets.controller';
import { GatewayModule } from 'src/gateway/gateway.module';
import { GatewayService } from 'src/gateway/gateway.service';

@Module({
    providers:[GatewayService],
    exports: [GatewayService]
})
export class SocketsModule {}
