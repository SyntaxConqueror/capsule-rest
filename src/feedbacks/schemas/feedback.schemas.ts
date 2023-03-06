import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Capsule } from "src/capsules/schemas/capsule.schema";
import { User} from "src/users/schemas/users.schemas";
import { ObjectId } from 'mongodb';

export type feedbackDocument = Feedback & Document;


@Schema()
export class Feedback{
    // TODO create more props(likes, date)
    @Prop({ required: true, maxlength: 500 })
    content: string;

    @Prop()
    date: string;

    @Prop()
    likes: number

    @Prop({ type: ObjectId, ref: 'Capsule' })
    capsuleID: Capsule;

    @Prop({ type: ObjectId, ref: 'User' })
    userID: User;
}

export const FeedbackSchema = SchemaFactory.createForClass(Feedback);