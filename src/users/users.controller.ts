import { Body, Controller, Delete, Get, Param, Put, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { NewUserDto } from './dto/new-user.dto';
import { UsersService } from './users.service';
import axios from 'axios';

const WEBHOOK_URL = 'https://webhook.site/31e057ff-bd7c-4992-98a1-2fc09b31d132';

@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService){}

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
