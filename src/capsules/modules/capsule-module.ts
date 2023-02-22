// user.module.ts
import { Module } from '@nestjs/common';
import { CapsulesController } from '../capsules.controller';
import { CapsuleService } from '../service/capsule.service';

@Module({
    controllers: [CapsulesController],
    providers: [CapsuleService],
})
export class CapsuleModule {}