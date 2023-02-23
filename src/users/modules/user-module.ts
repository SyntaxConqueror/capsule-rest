// user.module.ts
import { Module } from '@nestjs/common';
import { UsersController } from '../users.controller';
import { UserService } from '../service/user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../schemas/users.schemas';

@Module({
    imports:[
        MongooseModule.forFeature([
            {name: User.name, schema: UserSchema}
        ])
    ],
    controllers: [UsersController],
    providers: [UserService]

})
export class UserModule {}