import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, HydratedDocument } from "mongoose";

export type UserDocument = User & Document;

@Schema()
export class User{
    // TODO create prop(login)
    @Prop()
    name: string;
    @Prop()
    email: string;
    @Prop()
    password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);