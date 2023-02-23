import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { User } from "src/users/schemas/users.schemas";

export type capsuleDocument = Capsule & Document;

@Schema()
export class Capsule {
    @Prop()
    name: string;
    @Prop()
    client_amount: number;
    @Prop()
    client_list?: Array<User>;
    @Prop()
    price: number;
    @Prop()
    is_reserved: boolean;
    @Prop()
    facillities_list: Array<String>;
}

export const capsuleSchema = SchemaFactory.createForClass(Capsule);