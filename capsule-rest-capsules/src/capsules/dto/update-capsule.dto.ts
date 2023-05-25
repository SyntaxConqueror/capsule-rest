import { User } from "src/users/user.schema";


export class UpdateCapsuleDto {
    readonly id?: number;
    readonly name?: string;
    readonly client_amount?: number;
    readonly client_list?: Array<User>;
    readonly price?: number;
    readonly is_reserved?: boolean;
    readonly facillities_list?: Array<String>;
}