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
import { CapsuleCreateDto } from './dto/create-capsule.dto';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { CurrentUser } from 'src/auth/decorator/currentUser';
import { User } from 'src/users/user.schema';



@Controller('capsules')
@UseInterceptors(ClassSerializerInterceptor)
export default class CapsulesController {
    
    constructor(@Inject('CAPSULES_SERVICE') private capsulesService: 
    ClientProxy){}

    @Get()
    async findAllCapsules(){
        return this.capsulesService.send({cmd: 'find-capsules'}, {});
    }

    @Post()
    async createCapsule(@Body() capsule: CapsuleCreateDto){
        return this.capsulesService.send({cmd: 'create-capsule'}, capsule);
    }

    @Get(':type')
    async findNotReservedCapsules(@Param('type') type: string){
        return this.capsulesService.send({cmd: 'find-not-reserved-capsules'}, type);
    }

    @Post(':id')
    async findCapsuleById(@Param('id') id:string){
        return this.capsulesService.send({cmd: 'find-capsule-by-id'}, id);
    }

    @Put(':id')
    async updateCapsule(@Param('id') id: string, @Body() capsule: CapsuleCreateDto){
        const data = {id, capsule};
        return this.capsulesService.send({cmd: 'update-capsule-by-id'}, data);
    }

    @UseGuards(JwtGuard)
    @Put("/reserve/:id")
    async reserveCapsule(@Param("id") capsuleID: string, @CurrentUser() user: User){
        return this.capsulesService.send({cmd: "reserve-capsule"}, {capsuleID, user});
    }

    @UseGuards(JwtGuard)
    @Put("/unreserve/:capsuleID")
    async unreserveCapsule(@Param("capsuleID") capsuleID: string, @CurrentUser() user: User){
        
        return this.capsulesService.send({cmd: "unreserve-capsule"}, {capsuleID, user});
    }

    @Delete(':id')
    async deleteCapsule(@Param("id") id: string){
        return this.capsulesService.send({cmd: 'delete-capsule-by-id'}, id);
    }
}