import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { User } from "src/users/user.schema";


export type capsuleDocument = Capsule & Document;

@Schema()
export class Capsule {
    @Prop({ required: true })
    name: string;
    @Prop({ required: true })
    clientAmount: number;
    @Prop()
    clientList?: Array<User>;
    @Prop({ required: true })
    price: number;
    @Prop({ required: true })
    isReserved: boolean;
    @Prop()
    facillitiesList: [];
}

export const capsuleSchema = SchemaFactory.createForClass(Capsule);