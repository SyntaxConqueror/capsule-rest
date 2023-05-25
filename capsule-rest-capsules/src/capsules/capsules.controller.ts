import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Res, UseGuards } from '@nestjs/common';
import { CapsuleCreateDto } from './dto/create-capsule.dto';
import { CapsuleService } from './service/capsule.service';
import { Capsule } from './schemas/capsule.schema';

import { MessagePattern } from '@nestjs/microservices';
import { User, UserDocument } from 'src/users/user.schema';


@Controller('capsules')
export class CapsulesController {
    constructor(private readonly capsuleService: CapsuleService) {}

    @MessagePattern({cmd: 'create-capsule'})
    async create(createCapsuleDto: Capsule) {
        return await this.capsuleService.create(createCapsuleDto);
    }
    
    @MessagePattern({cmd: 'find-capsules'})
    async findAll(): Promise<Capsule[]> {
        return await this.capsuleService.findAll();
    }
    
    @MessagePattern({cmd : 'find-not-reserved-capsules'})
    async findNotReservedCapsules(type: string): Promise<Capsule[]>{
        return this.capsuleService.findReservationsCapsules(type);
    }
    
    @MessagePattern({cmd: 'find-capsule-by-id'})
    async findOne(id: string){
        return await this.capsuleService.findOne(id);
    }

    @MessagePattern({cmd: 'reserve-capsule'})
    async reserveCapsule(data: {capsuleID: string, user: any}){
        const {capsuleID, user} = data;
        
        return await this.capsuleService.reserveCapsule(capsuleID, user);
    }

    @MessagePattern({cmd: 'unreserve-capsule'})
    async unreserveCapsule(data: {capsuleID: string, user: any}){
        const {capsuleID, user} = data;
        return await this.capsuleService.unReserveCapsule(capsuleID, user);
    }
    
    @MessagePattern({cmd: 'update-capsule-by-id'})
    async update(data: {id: string, capsule: Capsule}) {
        const {id, capsule} = data;
        return await this.capsuleService.update(id, capsule);
    }
    
    @MessagePattern({cmd: 'delete-capsule-by-id'})
    async remove(id: string) {
        return await this.capsuleService.remove(id);
    }
}