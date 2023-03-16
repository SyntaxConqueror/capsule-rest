import { Body, Controller, Delete, Get, Param, Put, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { NewUserDto } from './dto/new-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService){}

    @Get()
    findAll(){
        return this.usersService.findAll();
    }

    @UseGuards(JwtGuard)
    @Get(':id')
    findOne(@Param('id') id: string){
        return this.usersService.findById(id);
    }

    @UseGuards(JwtGuard)
    @Put(':id')
    update(@Param('id') id: string, @Body() updateUserDto: NewUserDto) {
        return this.usersService.update(id, updateUserDto);
    }

    @UseGuards(JwtGuard)
    @Delete(':id')
    remove(@Param('id') id: string) {
        this.usersService.remove(id);
    }

}
