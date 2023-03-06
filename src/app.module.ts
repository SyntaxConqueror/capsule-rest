import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { CapsulesController } from './capsules/capsules.controller';
import { UserService } from './users/service/user.service';
import { CapsuleService } from './capsules/service/capsule.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './users/modules/user-module';
import { User, UserSchema } from './users/schemas/users.schemas';
import { Capsule, capsuleSchema } from './capsules/schemas/capsule.schema';
import { FeedbacksController } from './feedbacks/feedbacks.controller';
import { Feedback, FeedbackSchema } from './feedbacks/schemas/feedback.schemas';
import { FeedbacksService } from './feedbacks/service/feedbacks.service';
import { FeedbackModule } from './feedbacks/modules/feedback.module';

@Module({
  imports: [
    UserModule,
    FeedbackModule,
    MongooseModule.forRoot('mongodb+srv://artshvecz:Lrn7S40vv6e4KLcp@capsule-rest.fkkuc60.mongodb.net/?retryWrites=true&w=majority'),
    MongooseModule.forFeature([
      {name: Feedback.name, schema: FeedbackSchema},
      {name: User.name, schema: UserSchema},
      {name: Capsule.name, schema: capsuleSchema}
    ])
  ],
  controllers: [AppController, UsersController, CapsulesController, FeedbacksController],
  providers: [AppService, UserService, CapsuleService, FeedbacksService],
})
export class AppModule {}
