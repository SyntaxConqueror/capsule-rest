import { User } from "src/users/user.schema";

export interface Capsule
{
    id: number;
    name: string;
    client_amount: number;
    client_list?: Array<User>;
    price: number;
    is_reserved: boolean;
    facillities_list: Array<String>;
}