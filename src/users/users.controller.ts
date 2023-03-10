// user.controller.ts
import { Controller, Get, Post, Body, Param, Put, Delete, ValidationPipe, UsePipes } from '@nestjs/common';
import { UserService } from './service/user.service';
import { CreateUserDto } from './dto/create-user.dto';
// import { User } from './interfaces/user-interface';
import { User } from './schemas/users.schemas';

@Controller('user')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(@Body('name') name: string, @Body('email') email: string, @Body('password') password: string) {
    return this.userService.register(name, email, password);
  }

  @Post()
  @UsePipes(new ValidationPipe())
  async create(@Body() createUserDto: CreateUserDto) {
    await this.userService.create(createUserDto);
  }

  @Get()
  async findAll(): Promise<User[]> {
    return await this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string){
    return await this.userService.findOne(id);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  async update(@Param('id') id: string, @Body() updateUserDto: CreateUserDto) {
    await this.userService.update(id, updateUserDto);
  } 

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.userService.remove(id);
  }
}
