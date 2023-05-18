import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from "bcrypt";
import {JwtService} from '@nestjs/jwt';
import { NewUserDto } from 'src/users/new-user.dto';
import { ExistingUserDto } from 'src/users/existing-user.dto';
import { UserDetails } from 'src/users/user-details.interface';



@Injectable()
export class AuthService {
    constructor(private userService: UsersService, private jwtService: JwtService){}
    

    async hashPassword(password: string): Promise<string>{
        const salt = 10;
        const hashPassword = await bcrypt.hash(password, salt);
        return hashPassword;
    }

    async register(user: Readonly<NewUserDto>): Promise<UserDetails>{
        const {name, email, password} = user;
        const existingUser = await this.userService.findByEmail(email);

        if(existingUser) throw new HttpException("Email is already taken!", 
        HttpStatus.BAD_REQUEST);
        const hashedPassword = await this.hashPassword(password);

        const newUser = await this.userService.create(name, email, hashedPassword);
        return this.userService._getUserDetails(newUser);
    }

    async doesPasswordMatch(password:string, hashedPassword: string):Promise<boolean>{
        return bcrypt.compare(password, hashedPassword);
    }

    async validateUser(email: string, password: string): Promise<UserDetails>{
        const user = await this.userService.findByEmail(email);
        const doesUserExists = !!user;
        
        if(!doesUserExists){
            throw new HttpException("Something is not correct!", HttpStatus.FORBIDDEN);
        }

        const doesPasswordMatch = await this.doesPasswordMatch(password, user.password);

        if(!doesPasswordMatch) throw new HttpException("Something is not correct!", HttpStatus.FORBIDDEN);

        return this.userService._getUserDetails(user);
    }

    async login(existingUser: ExistingUserDto):Promise<{token: string}>{
        const {email, password} = existingUser;
        const user = await this.validateUser(email, password);

        if(!user) throw new HttpException("Bad request", HttpStatus.BAD_REQUEST);

        const jwt = await this.jwtService.signAsync({user});
        return {token: jwt};
    }

}
