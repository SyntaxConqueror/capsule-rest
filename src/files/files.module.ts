import { Module } from '@nestjs/common';
import { ConfigService } from 'aws-sdk';
import { FilesService } from './files.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import PublicFile from './entities/publicFile.entity';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { PublicFileSchema } from './entities/publicFile.schema';

@Module({
    imports:[MongooseModule.forFeature([{
        name: "PublicFile", schema: PublicFileSchema
      }]), ConfigModule.forRoot()],
    providers:[FilesService],
    exports:[FilesService]
})
export class FilesModule {}
