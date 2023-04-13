import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, HydratedDocument } from "mongoose";
import { PublicFile } from "src/files/entities/publicFile.schema";
import { OneToOne } from "typeorm";

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
    @OneToOne(
        () => PublicFile,
        {
        eager: true,
        nullable: true
        }
    )
    public avatar?: PublicFile

}

export const UserSchema = SchemaFactory.createForClass(User);