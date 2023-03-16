import { Body, Controller, Delete, Get, Param, Post, Put, Res, UseGuards } from '@nestjs/common';
import { Feedback } from './schemas/feedback.schemas';
import { FeedbacksService } from './service/feedbacks.service';
import { Response } from 'express';
import { JwtGuard } from 'src/auth/guards/jwt.guard';


@Controller('feedbacks')
export class FeedbacksController {
    constructor(private readonly feedBacksService: FeedbacksService) {}

    @Post()
    async create(@Body() createFeedback: Feedback, @Res() res: Response) {
        await this.feedBacksService.create(createFeedback);
        res.send("Ваш коментарій створено!");
    }

    @UseGuards(JwtGuard)
    @Put("/:feedbackId/like/:userId")
    async toggleLike(
      @Param("feedbackId") feedbackId: string,
      @Param("userId") userId: string
      ) {
        return this.feedBacksService.toggleLike(feedbackId, userId);
    }

    @Get()
    async findAll(){
        return await this.feedBacksService.findAll();
    }

    @Get(':id')
    async findOne(@Param("id") id:string){
        const feedback = await this.feedBacksService.findOne(id)
        return {
            feedback,
            likesCount: feedback.likes.length
        };
    }

    
    @Get("capsule/:capsuleID")
    async findAllFeedbacksForCapsule(@Param("capsuleID") capsuleID:string){
        return await this.feedBacksService.findAllFeedbacksForCapsule(capsuleID);
    }

    
    @Get("user/:userID")
    async findAllFeedbacksUserCreated(@Param("userID") userID:string){
        return await this.feedBacksService.findAllFeedbacksUserCreated(userID);
    }

    @UseGuards(JwtGuard)
    @Put(":id")
    async update(@Param("id") id:string){
        return await this.feedBacksService.update(id);
    }

    @UseGuards(JwtGuard)
    @Delete(":id")
    async remove(@Param("id") id:string){
        return await this.feedBacksService.remove(id);
    }
}
