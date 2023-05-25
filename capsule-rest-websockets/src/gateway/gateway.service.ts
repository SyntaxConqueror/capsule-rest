import { Injectable, OnModuleInit } from '@nestjs/common';
import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { CapsuleReserveDTO } from 'src/dto/capsuleReserve.dto';
import { feedbackLikeDto } from 'src/dto/feedbackLike.dto';

@WebSocketGateway({
    cors:{
        origin:['http://localhost:3001']
    }
})
export class GatewayService implements OnModuleInit {
    

    @WebSocketServer()
    server: Server;

    onModuleInit() {
        this.server.on("connection", (socket) => {
            console.log(socket.id + " connected");
        })
    }

    async onFindUserMessage(payload : {id : string}){
        const message = "Id is: " + payload.id;
        this.server.emit("onFindUserMessage", {msg: "FindUser", id: message});
    }

    async onCapsuleReservation(payload: CapsuleReserveDTO){
        let message = "User: " + payload.userName + " with userID: " + payload.userId + " has reserved capsule with id: " + payload.capsuleId;
        if(!payload.reservAttempt){
            message = "User: " + payload.userName + " with userID: " + payload.userId + " has tried to reserve capsule with id: " + payload.capsuleId + " but it is already reserved";
        }
        
        this.server.emit("onCapsuleReservation", {event: "CapsuleReservation", msg: message});
    }

    async onCapsuleUnreserve(payload: CapsuleReserveDTO){
        
        let message = "User: " + payload.userName + " with userID: " + payload.userId + " has unreserved capsule with id: " + payload.capsuleId;
        if(!payload.reservAttempt){
            message = "User: " + payload.userName + " with userID: " + payload.userId + " has tried to unreserve capsule with id: " + payload.capsuleId + " but it is not reserved";
        }

        this.server.emit("onCapsuleUnReservation", {event: "CapsuleUnReservation", msg: message});
    }

    async OnFeedbackLike(payload: feedbackLikeDto){
        let message = "User with ID: " + payload.userId + " has liked feedback with ID: " + payload.feedbackId;
        console.log(payload.toogled);
        if(payload.toogled == false){
            message = "User with ID: " + payload.userId + " has remove like for feedback with ID: " + payload.feedbackId;
        }

        this.server.emit("onFeedbackLike", {event: "FeedbackLike", msg: message});
    }

}
