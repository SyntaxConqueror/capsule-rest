import { Injectable, Res } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Feedback, feedbackDocument } from '../schemas/feedback.schemas';

@Injectable()
export class FeedbacksService {
    constructor(
        @InjectModel(Feedback.name) private feedbackModel: Model<feedbackDocument>,
    ) {}

    async create(feedback: Feedback): Promise<Feedback> {
        const createdFeedback = new this.feedbackModel(feedback);
        return createdFeedback.save();
    }

    async findAll(): Promise<Feedback[]> {
        return this.feedbackModel
        .find()
        .populate('capsuleID')
        .populate('userID')
        .exec();
    }

    async findOne(id:string):Promise<Feedback>{        
        if (this.feedbackModel.findById(id)){
            return this.feedbackModel.findById(id).populate('capsuleID').populate('userID');
        }
        else{
            throw Error();
        } 
    }

    async findAllFeedbacksForCapsule(capsuleId: string):Promise<Feedback[]>{
        let filter = {capsuleID: capsuleId};
        if(this.feedbackModel.find(filter)){
            return this.feedbackModel.find(filter).populate('capsuleID').populate('userID').exec();
        }
        else{
            throw Error();
        }
    }

    async findAllFeedbacksUserCreated(userId: string):Promise<Feedback[]>{
        let filter = {userID: userId};
        if(this.feedbackModel.find(filter)){
            return this.feedbackModel.find(filter).populate('capsuleID').populate('userID').exec();
        }
        else{
            throw Error();
        }
    }

    async update(id: string){
        if (this.feedbackModel.findById(id)){
            return this.feedbackModel.findByIdAndUpdate(id).populate('capsuleID').populate('userID');
        }
        else{
            throw Error();
        }
    }

    async remove(id: string){
        if (this.feedbackModel.findById(id)){
            return this.feedbackModel.findByIdAndRemove(id);
        }
        else{
            throw Error();
        }
    }
}