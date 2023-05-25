// user.service.ts
import { Inject, Injectable, Res } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Capsule, capsuleDocument } from '../schemas/capsule.schema';
import { User, UserDocument } from 'src/users/user.schema';
import { ClientProxy } from '@nestjs/microservices';


@Injectable()
export class CapsuleService {
    constructor(
        @InjectModel(Capsule.name) private capsuleModel: Model<capsuleDocument>,
        @Inject("GATEWAY_SERVICE") private gatewayService: ClientProxy
    ){}

    async create(capsule: Capsule) {
        const newCapsule = new this.capsuleModel(capsule);
        return newCapsule.save();
    }

    async findAll(): Promise<Capsule[]> {
        return this.capsuleModel.find().exec();
    }
    
    async findOne(id: string):Promise<Capsule> {
        if (this.capsuleModel.findById(id)){
            return this.capsuleModel.findById(id);
        }else{
            throw Error();
        }
        
    }

    async findReservationsCapsules(type: string): Promise<Capsule[]> {
        let filter = {};
        switch(type){
            case "reserved":
                filter = {is_reserved: true};
                return this.capsuleModel.find(filter).exec();
            case "non_reserved":
                filter = {is_reserved: false};
                return this.capsuleModel.find(filter).exec();
        }
    }

    async reserveCapsule(capsuleID: string, user: any){
        if(this.capsuleModel.findById(capsuleID)){
            const newCapsule = await this.capsuleModel.findById(capsuleID);
            
            if(newCapsule.isReserved){
                await this.gatewayService.send({cmd: 'capsule-reservation'}, {
                    userId: user.id,
                    userName: user.name,
                    capsuleId: newCapsule.id,
                    reservAttempt: false
                }).subscribe();
                return "This capsule is reserved!";
            }
            newCapsule.clientList.push(user);
            newCapsule.isReserved = true;
            await this.gatewayService.send({cmd: 'capsule-reservation'}, {
                userId: user.id,
                userName: user.name,
                capsuleId: newCapsule.id,
                reservAttempt: true
            }).subscribe();
            return this.capsuleModel.findByIdAndUpdate(capsuleID, newCapsule);
        } else {
            return "Capsule not found";
        }
    }

    async unReserveCapsule(capsuleID: string, user: any){
        
        if(this.capsuleModel.findById(capsuleID)){
            const newCapsule = await this.capsuleModel.findById(capsuleID);

            if(!newCapsule.isReserved){
                await this.gatewayService.send({cmd: 'capsule-unreservation'}, {
                    userId: user.id,
                    userName: user.name,
                    capsuleId: newCapsule.id,
                    reservAttempt: false
                }).subscribe();
                return "This capsule is not reserved!";
            }

            newCapsule.clientList = [];
            newCapsule.isReserved = false;
            await this.gatewayService.send({cmd: 'capsule-unreservation'}, {
                userId: user.id,
                userName: user.name,
                capsuleId: newCapsule.id,
                reservAttempt: true
            }).subscribe();
            return this.capsuleModel.findByIdAndUpdate(capsuleID, newCapsule);
        } else {
            return "Capsule not found";
        }
    }

    async update(id: string, capsule: Capsule) {
        if (this.capsuleModel.findById(id)){
            return this.capsuleModel.findByIdAndUpdate(id, capsule);
        }else{
            throw Error();
        }
        
    }

    async remove(id: string) {
        if (this.capsuleModel.findById(id)){
            return this.capsuleModel.findByIdAndRemove(id);
        }
        else{
            throw Error();
        }
    }
}