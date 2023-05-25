import { Body, Controller, Delete, Get, Inject, Param, Post, Put, Req, UploadedFile, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { NewUserDto } from './dto/new-user.dto';
import { UsersService } from './users.service';
import axios from 'axios';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import RequestWithUser from './dto/requestWithUser.interface';
import { ClientProxy, MessagePattern } from '@nestjs/microservices';



@Controller('users')
export class UsersController {

    constructor(
        private usersService: UsersService,
        @Inject("ES_SERVICE") private readonly esService: ClientProxy,
        ){}

    @Post('avatar')
    @UseInterceptors(FileInterceptor('file'))
    async addAvatar(@Req() request: RequestWithUser, @UploadedFile() file: Express.Multer.File) {
        return this.usersService.addAvatar(request.user.id, file.buffer, file.originalname);
    }


    @MessagePattern({cmd : 'find-all-users'})
    async findAll(){
        return this.usersService.findAll();
    }

    @MessagePattern({cmd : 'find-user-by-id'})
    async findOne(id: string){
        return this.usersService.findById(id);
    }

    @MessagePattern({cmd: 'users-elastic-search'})
    async usersElasticSearch(text: string){
        
        return await this.esService.send({cmd:"search-users"}, text);
    }

    @MessagePattern({cmd: 'find-user-by-name'})
    async findUserByName(name: string){
        return this.usersService.findByName(name);
    }
    
    @MessagePattern({cmd : 'update-user-by-id'})
    async update(data: {id:string, user:NewUserDto}) {
        return this.usersService.update(data);
    }
    
    @MessagePattern({cmd : 'delete-user-by-id'})
    async remove(id: string) {
        return this.usersService.remove(id);
    }

}

