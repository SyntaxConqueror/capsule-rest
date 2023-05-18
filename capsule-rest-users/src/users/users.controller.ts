import { Body, Controller, Delete, Get, Param, Post, Put, Req, UploadedFile, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { NewUserDto } from './dto/new-user.dto';
import { UsersService } from './users.service';

import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import RequestWithUser from './dto/requestWithUser.interface';
import { GrpcMethod, GrpcService, MessagePattern } from '@nestjs/microservices';
import { User } from './user.schema';



@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService){}

    @Post('avatar')
    @UseInterceptors(FileInterceptor('file'))
    async addAvatar(@Req() request: RequestWithUser, @UploadedFile() file: Express.Multer.File) {
        return this.usersService.addAvatar(request.user.id, file.buffer, file.originalname);
    }

    @GrpcMethod("UserController", "FindAll")
    async findAll({}, metadata: any){
        return this.usersService.findAll();
    }

    @GrpcMethod("UserController", "FindUser")
    async findUser(id: {id: string}, metadata: any){
        return this.usersService.findById(id.id);
    }

    @GrpcMethod("UserController", "Update")
    async update(data:{id:{id: string}, user:NewUserDto}) {
        return this.usersService.update(data);
    }
    
    @GrpcMethod("UserController", "Delete")
    async delete(id: {id: string}, metadata: any) {
        
        return this.usersService.remove(id.id);
    }

}

