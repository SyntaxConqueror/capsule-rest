import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { IsEmail, Length, Max, MaxLength } from 'class-validator';

@Entity()
export class UserEntity {
    id: number;
    @MaxLength(20, {message: "Name is too long!"})
    name: string;
    @IsEmail({}, {message: "Invalid email adress!"})
    email: string;
    @MaxLength(8, {message: "Password is too long!"})
    password: string;
}
