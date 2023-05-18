import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Res, UseGuards } from '@nestjs/common';
import { CapsuleService } from './service/capsule.service';
import { Capsule } from './schemas/capsule.schema';

import { GrpcMethod, MessagePattern } from '@nestjs/microservices';


@Controller('capsules')
export class CapsulesController {
    constructor(private readonly capsuleService: CapsuleService) {}

    @GrpcMethod("CapsuleController", "Create")
    async create(capsule: Capsule) {
        console.log(capsule);
        return await this.capsuleService.create(capsule);
    }
    
    @GrpcMethod("CapsuleController", "FindAll")
    async findAll() {
        return await this.capsuleService.findAll();
    }
    
    
    async findNotReservedCapsules(type: string): Promise<Capsule[]>{
        return this.capsuleService.findReservationsCapsules(type);
    }
    
    @GrpcMethod("CapsuleController", "FindOne")
    async findOne(id: {id: string}){
        
        return await this.capsuleService.findOne(id.id);
    }
    
    @GrpcMethod("CapsuleController", "Update")
    async update(data: {id: string, capsule: Capsule}) {
        
        const {id, capsule} = data;
        return await this.capsuleService.update(id, capsule);
    }
    
    @GrpcMethod("CapsuleController", "Remove")
    async remove(id: {id: string}) {
        
        return await this.capsuleService.remove(id.id);
    }
}