import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';


import { ObjectId } from 'mongodb';
import { now } from 'mongoose';
import { Capsule } from 'src/capsules/schemas/capsule.schema';
import { User } from 'src/users/user.schema';

export type feedbackDocument = Feedback & Document;

@Schema()
export class Feedback {
  @Prop({ required: true, maxlength: 500 })
  content: string;

  @Prop({ default: now() })
  date: Date;

  @Prop()
  likes?: { userId: string }[];

  @Prop({ type: ObjectId, ref: 'Capsule' })
  capsuleID: Capsule;

  @Prop({ type: ObjectId, ref: 'User' })
  userID: User;
}

export const FeedbackSchema = SchemaFactory.createForClass(Feedback);
