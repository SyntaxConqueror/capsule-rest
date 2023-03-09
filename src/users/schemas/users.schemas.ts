import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, HydratedDocument } from "mongoose";

export type UserDocument = User & Document;

@Schema()
export class User{
    // TODO create prop(login)
    @Prop({ required: true })
    name: string;
    
    @Prop({ required: true })
    email: string;
  
    @Prop({ required: true })
    password: string;

}

export const UserSchema = SchemaFactory.createForClass(User);