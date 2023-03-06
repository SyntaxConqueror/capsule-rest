import { Body, Controller, Delete, Get, Param, Post, Put, Res } from '@nestjs/common';
import { Feedback } from './schemas/feedback.schemas';
import { FeedbacksService } from './service/feedbacks.service';
import { Response } from 'express';


@Controller('feedbacks')
export class FeedbacksController {
    constructor(private readonly feedBacksService: FeedbacksService) {}

    @Post()
    async create(@Body() createFeedback: Feedback, @Res() res: Response) {
        await this.feedBacksService.create(createFeedback);
        res.send("Ваш коментарій створено!");
    }

    @Get()
    async findAll(){
        return await this.feedBacksService.findAll();
    }

    @Get(':id')
    async findOne(@Param("id") id:string){
        return await this.feedBacksService.findOne(id);
    }

    @Get("capsule/:capsuleID")
    async findAllFeedbacksForCapsule(@Param("capsuleID") capsuleID:string){
        return await this.feedBacksService.findAllFeedbacksForCapsule(capsuleID);
    }

    @Get("user/:userID")
    async findAllFeedbacksUserCreated(@Param("userID") userID:string){
        return await this.feedBacksService.findAllFeedbacksUserCreated(userID);
    }

    @Put(":id")
    async update(@Param("id") id:string){
        return await this.feedBacksService.update(id);
    }

    @Delete(":id")
    async remove(@Param("id") id:string){
        return await this.feedBacksService.remove(id);
    }
}
