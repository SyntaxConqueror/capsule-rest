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
import { first, toArray } from 'rxjs';
import { User } from './user.schema';
import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { CurrentUser } from 'src/auth/decorator/currentUser';


@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
export default class UsersController {
    
    constructor(
        @Inject('USERS_SERVICE') private usersService: ClientProxy,
    ) {}


    @Get()
    async getUsers() {
        
        return this.usersService.send({cmd: 'find-all-users'}, {});
    }


    @UseGuards(JwtGuard)
    @Get(":id")
    async getUserById(@Param('id') id: string, @CurrentUser() user: any){
        return this.usersService.send({cmd: 'find-user-by-id'}, id);
    }

    @Get("/elastic/:name")
    async usersSearch(@Param("name") name:string){
        return this.usersService.send({cmd: 'users-elastic-search'}, name);
    }

    @Get("name/:name")
    async getUserByName(@Param("name") name: string){
        return this.usersService.send({cmd: 'find-user-by-name'}, name);
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