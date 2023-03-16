import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/users/user.schema';
import { FeedbacksController } from '../feedbacks.controller';
import { Feedback, FeedbackSchema } from '../schemas/feedback.schemas';
import { FeedbacksService } from '../service/feedbacks.service';

@Module({
    imports:[
        MongooseModule.forFeature([
            {name: Feedback.name, schema: FeedbackSchema},
            {name: "User", schema: UserSchema}
        ])
    ],
    controllers:[FeedbacksController],
    providers: [FeedbacksService],
    exports: [FeedbacksService]
})

export class FeedbackModule{}