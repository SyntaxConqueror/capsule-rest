import { Body, Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ExistingUserDto } from 'src/users/dto/existing-user.dto';
import { NewUserDto } from 'src/users/dto/new-user.dto';
import { UserDetails } from 'src/users/user-details.interface';
import { AuthService } from './auth.service';

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
        return this.authService.login(user);
    }

    
}
