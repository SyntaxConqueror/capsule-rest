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
import { Feedback } from './schemas/feedback.schemas';
import { JwtGuard } from 'src/auth/guards/jwt.guard';



@Controller('feedbacks')
@UseInterceptors(ClassSerializerInterceptor)
export default class FeedbacksController {
    
    constructor(@Inject('FEEDBACKS_SERVICE') private feedbacksService: 
    ClientProxy){}

    @Get()
    async findAllFeedbacks(){
        return this.feedbacksService.send({cmd: 'find-all-feedbacks'}, {});
    }

    @Post()
    async createFeedback(@Body() createFeedback: Feedback){
        return this.feedbacksService.send({cmd: 'create-feedback'}, createFeedback);
    }

    @Get(":id")
    async getFeedbackById(@Param("id") id: string){
        return this.feedbacksService.send({cmd: 'find-feedback-by-id'}, id);
    }

    @UseGuards(JwtGuard)
    @Put("/:feedbackId/like/:userId")
    async toogleLike(
        @Param("feedbackId") feedbackId: string,
        @Param("userId") userId: string
        ){
            const data = {feedbackId, userId};
            return this.feedbacksService.send({cmd: 'toogle-like'}, data);
        }
    
    @Get("capsule/:capsuleID")
    async findAllFeedbacksForCapsule(@Param("capsuleID") capsuleID:string){
        return this.feedbacksService.send({cmd: 'find-all-feedbacks-for-capsule'}, capsuleID);
    }

    @Get("user/:userID")
    async findAllFeedbacksUserCreated(@Param("userID") userID:string){
        return this.feedbacksService.send({cmd: 'find-all-feedbacks-user-created'}, userID);
    }

    @UseGuards(JwtGuard)
    @Put(':id')
    async updateFeedback(@Param('id') id: string){
        return this.feedbacksService.send({cmd: 'update-feedback'}, id);
    }

    @UseGuards(JwtGuard)
    @Delete(':id')
    async removeFeedback(@Param('id') id: string){
        return this.feedbacksService.send({cmd: 'delete-feedback'}, id);
    }
}