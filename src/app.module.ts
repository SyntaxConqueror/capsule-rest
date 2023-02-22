import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { CapsulesController } from './capsules/capsules.controller';
import { UserService } from './users/service/user.service';
import { CapsuleService } from './capsules/service/capsule.service';

@Module({
  imports: [],
  controllers: [AppController, UsersController, CapsulesController],
  providers: [AppService, UserService, CapsuleService],
})
export class AppModule {}
