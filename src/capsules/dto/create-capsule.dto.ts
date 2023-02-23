import { ArrayMaxSize, IsEmail, IsNotEmpty, Length, Max, MaxLength } from "class-validator";
import { User } from '../../users/interfaces/user-interface';
export class CapsuleCreateDto
{
    readonly id: number;
    @MaxLength(30, {message: "Name is too long!"})
    readonly name: string;
    @Max(3, {message: "Number of clients is more than 3!"})
    readonly client_amount: number;
    @ArrayMaxSize(3, {message: "List of clients are too big for one capsule!"})
    readonly client_list?: Array<User>;
    @IsNotEmpty()
    readonly price: number;
    readonly is_reserved: boolean;
    readonly facillities_list: Array<String>;
}