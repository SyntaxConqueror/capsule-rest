import { ArrayMaxSize, IsEmail, IsNotEmpty, Length, Max, MaxLength } from "class-validator";
import { User } from "src/users/user.schema";

export class CapsuleCreateDto
{
    
    @MaxLength(30, {message: "Name is too long!"})
    readonly name: string;
    @Max(3, {message: "Number of clients is more than 3!"})
    readonly clientAmount: number;
    @ArrayMaxSize(3, {message: "List of clients are too big for one capsule!"})
    readonly clientList?: Array<User>;
    @IsNotEmpty()
    readonly price: number;
    readonly isReserved: boolean;
    readonly facillitiesList: Array<String>;
}