import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, HydratedDocument } from "mongoose";


export type PublicFileDocument = PublicFile & Document;

@Schema()
export class PublicFile extends Document{
    
    @Prop()
    url: string;
   
    @Prop()
    key: string;

}

export const PublicFileSchema = SchemaFactory.createForClass(PublicFile);