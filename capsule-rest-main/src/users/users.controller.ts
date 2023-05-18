import {
        Body,
        Controller,
        Get,
        Post,
        UseGuards,
        UseInterceptors,
        ClassSerializerInterceptor, Inject, Param, Put, Delete,
    } from '@nestjs/common';
    import { ClientProxy } from '@nestjs/microservices';
import { UserDto } from './user.dto';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { ExistingUserDto } from './existing-user.dto';
import { AuthService } from 'src/auth/auth.service';


@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
export default class UsersController {
    
    constructor(
        @Inject('USERS_SERVICE') private usersService: ClientProxy
    ) {}

    
    @Get()
    async getUsers() {
        return this.usersService.send({cmd: 'find-all-users'}, {});
    }

    @Get(":id")
    async getUserById(@Param('id') id: string){
        return this.usersService.send({cmd: 'find-user-by-id'}, id);
    }

    @UseGuards(JwtGuard)
    @Put(":id")
    async updateUserById(@Param('id') id: string, @Body() user: UserDto){
        return this.usersService.send({cmd : 'update-user-by-id'}, {id, user});
    }

    @UseGuards(JwtGuard)
    @Delete(":id")
    async deleteUserById(@Param("id") id: string){
        return this.usersService.send({cmd: 'delete-user-by-id'}, id);
    }
    
}