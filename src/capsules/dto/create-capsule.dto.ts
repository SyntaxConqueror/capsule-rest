import { User } from '../../users/interfaces/user-interface';
export class CapsuleCreateDto
{
    readonly id: number;
    readonly name: string;
    readonly client_amount: number;
    readonly client_list?: Array<User>;
    readonly price: number;
    readonly is_reserved: boolean;
    readonly facillities_list: Array<String>;
}