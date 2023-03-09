import { Injectable, Res } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Feedback, feedbackDocument } from '../schemas/feedback.schemas';
import { User } from '../../users/schemas/users.schemas';

@Injectable()
export class FeedbacksService {
  constructor(
    @InjectModel(Feedback.name) private feedbackModel: Model<feedbackDocument>,
    @InjectModel(User.name) private userModel: Model<User>,
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

  async findOne(id: string): Promise<Feedback> {
    return await this.feedbackModel
      .findById(id)
      .populate('capsuleID')
      .populate('userID')
      .exec();
  }

  async findAllFeedbacksForCapsule(capsuleId: string): Promise<Feedback[]> {
    const filter = { capsuleID: capsuleId };
    if (this.feedbackModel.find(filter)) {
      return this.feedbackModel
        .find(filter)
        .populate('capsuleID')
        .populate('userID')
        .exec();
    } else {
      throw Error();
    }
  }

  async findAllFeedbacksUserCreated(userId: string): Promise<Feedback[]> {
    const filter = { userID: userId };
    if (this.feedbackModel.find(filter)) {
      return this.feedbackModel
        .find(filter)
        .populate('capsuleID')
        .populate('userID')
        .exec();
    } else {
      throw Error();
    }
  }

  async update(id: string) {
    if (this.feedbackModel.findById(id)) {
      return this.feedbackModel
        .findByIdAndUpdate(id)
        .populate('capsuleID')
        .populate('userID');
    } else {
      throw Error();
    }
  }

  async remove(id: string) {
    if (this.feedbackModel.findById(id)) {
      return this.feedbackModel.findByIdAndRemove(id);
    } else {
      throw Error();
    }
  }

  async toggleLike(feedbackId, userId) {
    const [user, feedback] = await Promise.all([
      this.userModel.findById(userId).exec(),
      this.feedbackModel.findById(feedbackId).exec(),
    ]);

    if (!user || !feedback) return 'Feedback or user not found!';

    const feedbackUser = feedback.likes.findIndex(
      (item) => item.userId === userId,
    );

    feedbackUser !== -1
      ? feedback.likes.splice(feedbackUser, 1)
      : feedback.likes.push({ userId });

    await feedback.save();
    return feedback;
  }
}
