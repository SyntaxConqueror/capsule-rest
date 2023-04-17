import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Res, UseGuards } from '@nestjs/common';
import { CapsuleCreateDto } from './dto/create-capsule.dto';
import { CapsuleService } from './service/capsule.service';
import { Capsule } from './schemas/capsule.schema';
import { Response } from 'express';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import axios from 'axios';

const WEBHOOK_URL = 'https://webhook.site/ecdba867-c78e-47e1-8a9d-5efb6eb8d976';

@Controller('capsule')
export class CapsulesController {
    constructor(private readonly capsuleService: CapsuleService) {}

    @Post()
    async create(@Body() createCapsuleDto: CapsuleCreateDto, @Res() res: Response) {
        await this.capsuleService.create(createCapsuleDto);
        res.send("Капсула створена!");
        axios.post(WEBHOOK_URL, { message: 'Capsule created!' });
    }
    
    @Get()
    async findAll(): Promise<Capsule[]> {
        return await this.capsuleService.findAll();
    }
    
    @UseGuards(JwtGuard)
    @Get(':type')
    async findNotReservedCapsules(@Param('type') type: string): Promise<Capsule[]>{
        return await this.capsuleService.findReservationsCapsules(type);
    }
    
    @Get(':id')
    async findOne(@Param('id') id: string){
        return await this.capsuleService.findOne(id);
    }
    
    @Put(':id')
    async update(@Param('id') id: string, @Body() updateCapsuleDto: CapsuleCreateDto, @Res() res: Response) {
        await this.capsuleService.update(id, updateCapsuleDto);
        res.send("Капсула створена! ID: " + id);
        axios.post(WEBHOOK_URL, { message: `Capsule with ID ${id} updated!` });
    }
    
    @Delete(':id')
    async remove(@Param('id') id: string, @Res() res: Response) {
        await this.capsuleService.remove(id);
        res.send("Капсула створена! ID: " + id);
        axios.post(WEBHOOK_URL, { message: `Capsule with ID ${id} deleted!` });
    }
}