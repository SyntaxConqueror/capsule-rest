import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from "bcrypt";
import { NewUserDto } from 'src/users/dto/new-user.dto';
import { UserDetails } from 'src/users/user-details.interface';
import { ExistingUserDto } from 'src/users/dto/existing-user.dto';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
    constructor(private userService: UsersService, private jwtService: JwtService){}

    async hashPassword(password: string): Promise<string>{
        const salt = 10;
        const hashPassword = await bcrypt.hash(password, salt);
        return hashPassword;
    }

    async register(user: Readonly<NewUserDto>): Promise<UserDetails | any>{
        const {name, email, password} = user;
        const existingUser = await this.userService.findByEmail(email);

        if(existingUser) return "Email is already taken!";
        const hashedPassword = await this.hashPassword(password);

        const newUser = await this.userService.create(name, email, hashedPassword);
        return this.userService._getUserDetails(newUser);
    }

    async doesPasswordMatch(password:string, hashedPassword: string):Promise<boolean>{
        return bcrypt.compare(password, hashedPassword);
    }

    async validateUser(email: string, password: string): Promise<UserDetails | null>{
        const user = await this.userService.findByEmail(email);
        const doesUserExists = !!user;
        
        if(!doesUserExists){
            return null;
        }

        const doesPasswordMatch = await this.doesPasswordMatch(password, user.password);

        if(!doesPasswordMatch) return null;

        return this.userService._getUserDetails(user);
    }

    async login(existingUser: ExistingUserDto):Promise<{token: string} | any>{
        const {email, password} = existingUser;
        const user = await this.validateUser(email, password);

        if(!user) return "Email or password are invalid";

        const jwt = await this.jwtService.signAsync({user});
        return {token: jwt};
    }

}
