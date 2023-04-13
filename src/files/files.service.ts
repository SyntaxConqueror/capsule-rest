import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { S3 } from 'aws-sdk';
import { ConfigService } from '@nestjs/config';
import { v4 as uuid } from 'uuid';
import PublicFile from './entities/publicFile.entity';
import { PublicFileDocument } from './entities/publicFile.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
 
@Injectable()
export class FilesService {
  constructor(
    @InjectModel("PublicFile")
    private publicFilesModel: Model<PublicFileDocument>,
    private readonly configService: ConfigService
  ) {}
 
  async uploadPublicFile(dataBuffer: Buffer, filename: string) {
    const s3 = new S3();
    const uploadResult = await s3.upload({
      Bucket: this.configService.get('AWS_PUBLIC_BUCKET_NAME'),
      Body: dataBuffer,
      Key: `${uuid()}-${filename}`
    })
      .promise();
 
    const newFile = this.publicFilesModel.create({
      key: uploadResult.Key,
      url: uploadResult.Location
    });
    (await newFile).save();
    return newFile;
  }
}