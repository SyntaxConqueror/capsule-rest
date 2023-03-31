// user.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Mongoose } from 'mongoose';
import { CapsulesController } from '../capsules.controller';
import { Capsule, capsuleSchema } from '../schemas/capsule.schema';
import { CapsuleService } from '../service/capsule.service';
import { HttpModule } from '@nestjs/axios'; 


@Module({
    imports:[
        MongooseModule.forFeature([{
            name: Capsule.name, schema: capsuleSchema
        }]), HttpModule
    ],
    controllers: [CapsulesController],
    providers: [CapsuleService],
    exports:[CapsuleService]
})
export class CapsuleModule {}