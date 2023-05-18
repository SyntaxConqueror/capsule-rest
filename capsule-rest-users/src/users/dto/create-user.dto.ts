import { IsEmail, Length, Max, MaxLength } from "class-validator";

export class CreateUserDto{
    readonly id: number;
    @MaxLength(20, {message: "Name is too long!"})
    readonly name: string;
    @Length(8, 15, {message: "Password is must be 8-15 symbols length!"})
    readonly password: string;
    @IsEmail({}, {message: "Invalid email adress!"})
    readonly email: string;
}