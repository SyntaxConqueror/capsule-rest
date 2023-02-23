// user.service.ts
import { Injectable, Res } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Capsule, capsuleDocument } from '../schemas/capsule.schema';


@Injectable()
export class CapsuleService {
    constructor(@InjectModel(Capsule.name) private capsuleModel: Model<capsuleDocument>){}

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

    async update(id: string, capsule: Capsule) {
        if (this.capsuleModel.findById(id)){
            return this.capsuleModel.findByIdAndUpdate(id);
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