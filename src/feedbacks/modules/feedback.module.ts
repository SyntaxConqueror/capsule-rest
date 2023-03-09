import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FeedbacksController } from '../feedbacks.controller';
import { Feedback, FeedbackSchema } from '../schemas/feedback.schemas';
import { FeedbacksService } from '../service/feedbacks.service';
import {User, UserSchema} from "../../users/schemas/users.schemas";

@Module({
    imports:[
        MongooseModule.forFeature([
            {name: Feedback.name, schema: FeedbackSchema},
            {name: User.name, schema: UserSchema}
        ])
    ],
    controllers:[FeedbacksController],
    providers: [FeedbacksService]
})

export class FeedbackModule{}