import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FeedbacksController } from '../feedbacks.controller';
import { Feedback, FeedbackSchema } from '../schemas/feedback.schemas';
import { FeedbacksService } from '../service/feedbacks.service';

@Module({
    imports:[
        MongooseModule.forFeature([
            {name: Feedback.name, schema: FeedbackSchema}
        ])
    ],
    controllers:[FeedbacksController],
    providers: [FeedbacksService]
})

export class FeedbackModule{}