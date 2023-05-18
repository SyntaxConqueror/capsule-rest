import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { feedbacksMicroserviceOptions } from './feedbacks.grpc.options';
import { Client, ClientGrpc } from '@nestjs/microservices';
import { IFeedbacksGrpcService } from './feedbacks.grpc.interface';
import { Feedback } from './schemas/feedback.schemas';

@Controller('feedbacks')
export class FeedbacksController {
    @Client(feedbacksMicroserviceOptions)
    private client: ClientGrpc;

    private grpcService: IFeedbacksGrpcService;

    onModuleInit() {                                                            
        this.grpcService = this.client.getService<IFeedbacksGrpcService>('FeedbackController'); 
    }

    @Get(":id")
    async findOne(@Param("id") id : string){
        return this.grpcService.findOne({id: id});
    }

    @Get()
    async findAll(){
        return this.grpcService.findAll({});
    }

    @Post()
    async create(@Body() feedback: Feedback){
        return this.grpcService.create(feedback);
    }

    @Post(":feedbackID/like/:userID")
    async toogleLike(@Param("feedbackID") feedbackID: String, @Param("userID") userID: String){
        
        return this.grpcService.toogleLike({feedbackID, userID});
    }

    @Put(":id")
    async update(@Param("id") id: String, @Body() feedback: Feedback){
        const data = {id: {id}, feedback: feedback};
        return this.grpcService.update(data);
    }

    @Delete(":id")
    async remove(@Param("id") id: String){
        return this.grpcService.remove({id: id});
    }
}
