import { User } from "src/users/schemas/users.schemas";
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