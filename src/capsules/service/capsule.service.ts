// user.service.ts
import { Injectable, Res } from '@nestjs/common';
import { User } from '../../users/interfaces/user-interface';
import { Capsule } from '../interface/capsule-interface';
import { Response } from 'express';
import { type } from 'os';
import { startWith } from 'rxjs';

@Injectable()
export class CapsuleService {
    private capsule: Capsule[] = [];

    async create(capsule: Capsule) {
        this.capsule.push({...capsule, id: this.capsule.length});
           
    }

    async findAll(): Promise<Capsule[]> {
        return this.capsule;
    }
    
    async findOne(id: number):Promise<Capsule> {
        if (this.capsule.findIndex(capsule => capsule.id.toString() === id.toString()) !== -1){
            return this.capsule.find(capsule => capsule.id.toString() === id.toString());
        }else{
            throw Error();
        }
        
    }

    async findReservationsCapsules(type: string): Promise<Capsule[]> {
        switch(type){
            case "reserved":
                return this.capsule.filter(cap => cap.is_reserved == true);
            case "non_reserved":
                return this.capsule.filter(cap => cap.is_reserved == false);
        }
    }

    async update(id: number, capsule: Capsule) {
        if (this.capsule.findIndex(capsule => capsule.id.toString() === id.toString()) !== -1){
            const index = this.capsule.findIndex(capsule => capsule.id.toString() === id.toString());
            this.capsule[index] = capsule;
            return "Капсула оновлена! ID: " + capsule.id;
        }else{
            throw Error();
        }
        
    }

    async remove(id: number) {
        
        if (this.capsule.findIndex(capsule => capsule.id.toString() === id.toString()) !== -1){
            
            this.capsule = this.capsule.filter(capsule => capsule.id.toString() !== id.toString());
            return "Капсула видалена!";
        }
        else{
            throw Error();
        }
    }
}