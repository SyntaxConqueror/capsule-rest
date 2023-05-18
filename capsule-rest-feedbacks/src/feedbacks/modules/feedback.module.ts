import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/users/user.schema';
import { FeedbacksController } from '../feedbacks.controller';
import { Feedback, FeedbackSchema } from '../schemas/feedback.schemas';
import { FeedbacksService } from '../service/feedbacks.service';
import { ConfigService } from '@nestjs/config';
import { capsuleSchema } from 'src/capsules/schemas/capsule.schema';


@Module({
    imports:[
        MongooseModule.forFeature([
            {name: Feedback.name, schema: FeedbackSchema},
            {name: "User", schema: UserSchema},
            {name: "Capsule", schema: capsuleSchema}
        ])
    ],
    controllers:[FeedbacksController],
    providers: [FeedbacksService, ConfigService],
    exports: [FeedbacksService]
})

export class FeedbackModule{}