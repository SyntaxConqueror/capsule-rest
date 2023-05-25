import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/users/user.schema';
import { FeedbacksController } from '../feedbacks.controller';
import { Feedback, FeedbackSchema } from '../schemas/feedback.schemas';
import { FeedbacksService } from '../service/feedbacks.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { capsuleSchema } from 'src/capsules/schemas/capsule.schema';
import { ClientProxyFactory, ClientsModule, Transport } from '@nestjs/microservices';


@Module({
    imports:[
        MongooseModule.forFeature([
            {name: Feedback.name, schema: FeedbackSchema},
            {name: "User", schema: UserSchema},
            {name: "Capsule", schema: capsuleSchema}
        ]),
        ConfigModule.forRoot(),
        ClientsModule.register([
            {
              name: "GATEWAY_SERVICE",
              transport: Transport.RMQ
            },
        ]),
    ],
    controllers:[FeedbacksController],
    providers: [
        FeedbacksService,
        ConfigService,
        {
            provide: 'GATEWAY_SERVICE',
            useFactory: (configService: ConfigService) => {
              const user = configService.get('RMQ_USER');
              const password = configService.get('RMQ_PASS');
              const host = configService.get('RMQ_HOST');
              const queueName = configService.get('RMQ_QUEUE_WEBSOCKETS');
       
              return ClientProxyFactory.create({
                transport: Transport.RMQ,
                options: {
                  urls: [`amqp://${user}:${password}@${host}`],
                  queue: queueName,
                  queueOptions: {
                    durable: true,
                  },
                },
              })
            },
            
            inject: [ConfigService],
          },
    ],
    exports: [FeedbacksService]
})

export class FeedbackModule{}