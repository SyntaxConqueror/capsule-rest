// user.module.ts
import { Module } from '@nestjs/common';
import { Feedback, FeedbackSchema } from 'src/feedbacks/schemas/feedback.schemas';
import { CapsulesController } from '../capsules.controller';
import { CapsuleService } from '../service/capsule.service';

@Module({
    imports:[],
    controllers: [CapsulesController],
    providers: [CapsuleService],
})
export class CapsuleModule {}