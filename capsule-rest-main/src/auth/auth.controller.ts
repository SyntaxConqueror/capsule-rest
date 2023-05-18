import { Body, Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';

import { AuthService } from './auth.service';

import { MessagePattern } from '@nestjs/microservices';
import { ExistingUserDto } from 'src/users/existing-user.dto';
import { NewUserDto } from 'src/users/new-user.dto';
import { UserDetails } from 'src/users/user-details.interface';



@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @Post("register")
    register(@Body() user: NewUserDto): Promise<UserDetails>{
        return this.authService.register(user);
    }

    @Post("login")
    @HttpCode(HttpStatus.OK)
    login(@Body() user: ExistingUserDto): Promise<{token:string}>{
        console.log(user);
        return this.authService.login(user);
    }

    
}
