import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, HydratedDocument } from "mongoose";
import { PublicFile, PublicFileDocument } from "../files/entities/publicFile.schema";

export type UserDocument = User & Document;

@Schema()
export class User{
    
    @Prop({ required: true })
    name: string;
    
    @Prop({ required: true, unique: true })
    email: string;
  
    @Prop({ required: true })
    password: string;

    @Prop()
    avatar?: PublicFile

}

export const UserSchema = SchemaFactory.createForClass(User);