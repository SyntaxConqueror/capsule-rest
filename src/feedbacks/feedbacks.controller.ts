import { Body, Controller, Delete, Get, Param, Post, Put, Res, UseGuards } from '@nestjs/common';
import { Feedback } from './schemas/feedback.schemas';
import { FeedbacksService } from './service/feedbacks.service';
import { Response } from 'express';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { HttpService } from '@nestjs/axios';

const WEBHOOK_URL = 'https://webhook.site/ecdba867-c78e-47e1-8a9d-5efb6eb8d976';

@Controller('feedbacks')
export class FeedbacksController {
    constructor(
        private readonly feedBacksService: FeedbacksService,
        private readonly httpService: HttpService,
      ) {}      

    @Post()
    async create(@Body() createFeedback: Feedback, @Res() res: Response) {
        await this.feedBacksService.create(createFeedback);
        res.send("Ваш коментарій створено!");
    
        // Send an HTTP POST request to the webhook
        const data = { message: 'New feedback created' };
        await this.httpService.post(WEBHOOK_URL, data).toPromise();
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
    @Put(':id')
    async update(@Param('id') id: string) {
        const feedback = await this.feedBacksService.update(id);
    
        // Send an HTTP PUT request to the webhook
        const data = { message: 'Feedback updated', feedback };
        await this.httpService.put(WEBHOOK_URL, data).toPromise();
    
        return feedback;
    }    

    @UseGuards(JwtGuard)
    @Delete(':id')
    async remove(@Param('id') id: string) {
        const feedback = await this.feedBacksService.remove(id);
    
        // Send an HTTP DELETE request to the webhook
        const data = { message: 'Feedback removed', feedback };
        await this.httpService.delete(WEBHOOK_URL, { data }).toPromise();
    
        return feedback;
    }
    
}
