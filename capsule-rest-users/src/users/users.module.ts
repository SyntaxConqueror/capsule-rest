import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './user.schema';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { FilesService } from 'src/files/files.service';
import { FilesModule } from 'src/files/files.module';
import { PublicFileSchema } from 'src/files/entities/publicFile.schema';
import { ConfigService } from 'aws-sdk';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [
    MongooseModule.forFeature([{
      name: "User", schema: UserSchema
    }, {name: "PublicFile", schema: PublicFileSchema}]), 
    
    ConfigModule.forRoot()
  ],
  controllers: [UsersController],
  providers: [UsersService, FilesService, ConfigService],
  exports:[UsersService]
})
export class UsersModule {}
