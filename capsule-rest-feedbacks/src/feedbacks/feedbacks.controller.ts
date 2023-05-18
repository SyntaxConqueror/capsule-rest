import { Body, Controller, Delete, Get, Param, Post, Put, Res, UseGuards } from '@nestjs/common';
import { Feedback } from './schemas/feedback.schemas';
import { FeedbacksService } from './service/feedbacks.service';
import { Response } from 'express';
import { GrpcMethod, MessagePattern } from '@nestjs/microservices';




@Controller('feedbacks')
export class FeedbacksController {
    constructor(
        private readonly feedBacksService: FeedbacksService,        
      ) {}      

    
    @GrpcMethod("FeedbackController", "Create")
    async create(createFeedback: Feedback) {
        return await this.feedBacksService.create(createFeedback);
    }
    
    
    @GrpcMethod("FeedbackController", "ToogleLike")
    async toggleLike(data: {feedbackID: string, userID: string}) {
        return this.feedBacksService.toggleLike(data.feedbackID, data.userID);
    }

    @GrpcMethod("FeedbackController", "FindAll")
    async findAll({}){
        return this.feedBacksService.findAll();
    }

    @GrpcMethod("FeedbackController", "FindOne")
    async findOne(id: {id:string}){
        const feedback = await this.feedBacksService.findOne(id.id);
        return feedback;
    }

    
    async findAllFeedbacksForCapsule(capsuleID:string){
        return await this.feedBacksService.findAllFeedbacksForCapsule(capsuleID);
    }

    
    async findAllFeedbacksUserCreated(userID:string){
        return await this.feedBacksService.findAllFeedbacksUserCreated(userID);
    }

    
    @GrpcMethod("FeedbackController", "Update")
    async update(data: {id: {id: String}, feedback: Feedback}) {
        
        const feedback = await this.feedBacksService.update(data);
        return feedback;
    }

    @GrpcMethod("FeedbackController", "Remove")
    async remove(id: {id: string}) {
        const feedback = await this.feedBacksService.remove(id.id);
        return feedback;
    }
    
}
