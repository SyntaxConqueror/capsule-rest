import { Body, Controller, Delete, Get, Param, Post, Put, Res, UseGuards } from '@nestjs/common';
import { Feedback } from './schemas/feedback.schemas';
import { FeedbacksService } from './service/feedbacks.service';
import { Response } from 'express';
import { MessagePattern } from '@nestjs/microservices';




@Controller('feedbacks')
export class FeedbacksController {
    constructor(
        private readonly feedBacksService: FeedbacksService,        
      ) {}      

    
    @MessagePattern({cmd: 'create-feedback'})
    async create(createFeedback: Feedback) {
        return await this.feedBacksService.create(createFeedback);
    }
    

    
    @MessagePattern({cmd: 'toogle-like'})
    async toggleLike(data: {feedbackId: string, userId: string}) {
        const {feedbackId, userId} = data;
        return this.feedBacksService.toggleLike(feedbackId, userId);
    }

    @MessagePattern({cmd : 'find-all-feedbacks'})
    async findAll(){
        return this.feedBacksService.findAll();
    }

    @MessagePattern({cmd: 'find-feedback-by-id'})
    async findOne(id:string){
        const feedback = await this.feedBacksService.findOne(id)
        return {
            feedback,
            likesCount: feedback.likes.length
        };
    }

    
    @MessagePattern({cmd: 'find-all-feedbacks-for-capsule'})
    async findAllFeedbacksForCapsule(capsuleID:string){
        return await this.feedBacksService.findAllFeedbacksForCapsule(capsuleID);
    }

    
    @MessagePattern({cmd: 'find-all-feedbacks-user-created'})
    async findAllFeedbacksUserCreated(userID:string){
        return await this.feedBacksService.findAllFeedbacksUserCreated(userID);
    }

    
    @MessagePattern({cmd: 'update-feedback'})
    async update(id: string) {
        const feedback = await this.feedBacksService.update(id);
        return feedback;
    }    

    @MessagePattern({cmd: 'delete-feedback'})
    async remove(id: string) {
        const feedback = await this.feedBacksService.remove(id);
        return feedback;
    }
    
}
