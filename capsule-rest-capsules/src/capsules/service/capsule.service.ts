// user.service.ts
import { Injectable, Res } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Capsule, capsuleDocument } from '../schemas/capsule.schema';


@Injectable()
export class CapsuleService {
    constructor(@InjectModel("Capsule") private capsuleModel: Model<capsuleDocument>){}

    async create(capsule: Capsule) {
        const newCapsule = new this.capsuleModel(capsule);
        return newCapsule.save();
    }

    async findAll() {
        const capsules = await this.capsuleModel.find().exec();
        return {capsules: capsules};
    }
    
    async findOne(id: string) {
        if (this.capsuleModel.findById(id)){
            return await this.capsuleModel.findById(id);
        }else{
            throw Error();
        }
    }

    async findReservationsCapsules(type: string): Promise<Capsule[]> {
        let filter = {};
        switch(type){
            case "reserved":
                filter = {isReserved: true};
                return this.capsuleModel.find(filter).exec();
            case "non_reserved":
                filter = {isReserved: false};
                return this.capsuleModel.find(filter).exec();
        }
    }

    async update(id: string, capsule: Capsule) {
        
        if (this.capsuleModel.findById(id)){
            return await this.capsuleModel.findByIdAndUpdate(id, capsule);
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