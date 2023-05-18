import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import UsersController from './users/users.controller';
import { UsersModule } from './users/users.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { AuthController } from './auth/auth.controller';
import { FilesModule } from './files/files.module';
import CapsulesController from './capsules/capsules.controller';
import { CapsulesModule } from './capsules/capsule.module';
import { FeedbacksModule } from './feedbacks/feedbacks.module';
import FeedbacksController from './feedbacks/feedbacks.controller';




@Module({
  imports: [
    ConfigModule.forRoot(),
    UsersModule,
    AuthModule,
    FilesModule,
    CapsulesModule,
    FeedbacksModule,
    ClientsModule.register([
      {
        name: "USERS_SERVICE",
        transport: Transport.TCP
      },
      {
        name: "CAPSULES_SERVICE",
        transport: Transport.TCP,
        options: {port: 3002}
      },
      {
        name: "FEEDBACKS_SERVICE",
        transport: Transport.TCP,
        options: {port: 3003}
      }
  ]), 
    MongooseModule.forRoot(process.env.MONGO_DB)
  ],
  controllers: [AppController, UsersController, AuthController, CapsulesController, FeedbacksController],
  providers: [AppService],
})
export class AppModule {}
