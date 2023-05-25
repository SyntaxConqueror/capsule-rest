import { Controller, Inject } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CapsuleReserveDTO } from 'src/dto/capsuleReserve.dto';
import { feedbackLikeDto } from 'src/dto/feedbackLike.dto';
import { findUserDto } from 'src/dto/findUserDto';
import { GatewayService } from 'src/gateway/gateway.service';

@Controller()
export class SocketsController {
    constructor(@Inject(GatewayService) private gateway: GatewayService){}

    @MessagePattern({cmd: 'find-user'})
    async onFindUserMessage(@Payload() payload: findUserDto){
        return this.gateway.onFindUserMessage(payload);
    }

    @MessagePattern({cmd: 'capsule-reservation'})
    async onCapsuleReservation(@Payload() payload: CapsuleReserveDTO){
        return await this.gateway.onCapsuleReservation(payload);
    }

    @MessagePattern({cmd: "capsule-unreservation"})
    async onCapsuleUnReservation(@Payload() payload: CapsuleReserveDTO){
        return await this.gateway.onCapsuleUnreserve(payload);
    }

    @MessagePattern({cmd: 'feedback-like'})
    async onFeedbackLike(@Payload() payload: feedbackLikeDto){
        return await this.gateway.OnFeedbackLike(payload);
    }

}
