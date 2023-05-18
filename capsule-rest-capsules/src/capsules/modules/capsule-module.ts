// user.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CapsulesController } from '../capsules.controller';
import { Capsule, capsuleSchema } from '../schemas/capsule.schema';
import { CapsuleService } from '../service/capsule.service';
import { ConfigModule, ConfigService } from '@nestjs/config';


@Module({
    imports:[
        MongooseModule.forFeature([{
            name: "Capsule", schema: capsuleSchema
        }]), ConfigModule.forRoot()
    ],
    controllers: [CapsulesController],
    providers: [CapsuleService, ConfigService],
    exports:[CapsuleService]
})
export class CapsuleModule {}