import { Body, Controller, Delete, Get, Param, Post, Put, Req, UploadedFile, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { NewUserDto } from './dto/new-user.dto';
import { UsersService } from './users.service';
import axios from 'axios';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { UserDetails } from './user-details.interface';
import RequestWithUser from './dto/requestWithUser.interface';

const WEBHOOK_URL = 'https://webhook.site/ecdba867-c78e-47e1-8a9d-5efb6eb8d976';

@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService){}


    @Post('avatar')
    @UseGuards(JwtGuard)
    @UseInterceptors(FileInterceptor('file'))
    async addAvatar(@Req() request: RequestWithUser, @UploadedFile() file: Express.Multer.File) {

        console.log(request.user.id);
        console.log(file.buffer);
        console.log(file.originalname);
        return this.usersService.addAvatar(request.user.id, file.buffer, file.originalname);
    }


    @Get()
    async findAll(){
        const response = await axios.post(WEBHOOK_URL, {
            message: 'Request to findAll() method'
        });
        return this.usersService.findAll();
    }

    @UseGuards(JwtGuard)
    @Get(':id')
    async findOne(@Param('id') id: string){
        const response = await axios.post(WEBHOOK_URL, {
          message: `Request to findOne() method with id ${id}`
        });
        return this.usersService.findById(id);
    }

    @UseGuards(JwtGuard)
    @Put(':id')
    async update(@Param('id') id: string, @Body() updateUserDto: NewUserDto) {
        const response = await axios.post(WEBHOOK_URL, {
            message: `Request to update() method with id ${id}`
        });
        return this.usersService.update(id, updateUserDto);
    }
    @UseGuards(JwtGuard)
    @Delete(':id')
    async remove(@Param('id') id: string) {
        const response = await axios.post(WEBHOOK_URL, {
          message: `Request to remove() method with id ${id}`
        });
        return this.usersService.remove(id);
    }

}
