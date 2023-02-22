import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Res } from '@nestjs/common';
import { CapsuleCreateDto } from './dto/create-capsule.dto';
import { CapsuleService } from './service/capsule.service';
import { Capsule } from './interface/capsule-interface';
import { Response } from 'express';

@Controller('capsule')
export class CapsulesController {
    constructor(private readonly capsuleService: CapsuleService) {}

    @Post()
    async create(@Body() createCapsuleDto: CapsuleCreateDto, @Res() res: Response) {
        await this.capsuleService.create(createCapsuleDto);
        res.send("Капсула створена! ID: " + createCapsuleDto.id);
    }

    @Get()
    async findAll(): Promise<Capsule[]> {
        return await this.capsuleService.findAll();
    }
    
    @Get(':type')
    async findNotReservedCapsules(@Param('type') type: string): Promise<Capsule[]>{
        return await this.capsuleService.findReservationsCapsules(type);
    }

    @Get(':id')
    async findOne(@Param('id') id: number){
        return await this.capsuleService.findOne(id);
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() updateCapsuleDto: CapsuleCreateDto, @Res() res: Response) {
        await this.capsuleService.update(id, updateCapsuleDto);
        res.send("Капсула створена! ID: " + id);
    }

    @Delete(':id')
    async remove(@Param('id') id: number, @Res() res: Response) {
        await this.capsuleService.remove(id);
        res.send("Капсула створена! ID: " + id);
    }
}