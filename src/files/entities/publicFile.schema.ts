import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, HydratedDocument } from "mongoose";
import { PrimaryColumn } from "typeorm";


export type PublicFileDocument = PublicFile & Document;

@Schema()
export class PublicFile{
    
    @Prop({unique:true})
    public id: number;
    
    @Prop()
    public url: string;
   
    @Prop()
    public key: string;

}

export const PublicFileSchema = SchemaFactory.createForClass(PublicFile);