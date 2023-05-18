import { Module } from '@nestjs/common';
import { CapsulesController } from './capsules/capsules.controller';
import { ConfigModule } from '@nestjs/config';
import { CapsuleModule } from './capsules/modules/capsule-module';
import { MongooseModule } from '@nestjs/mongoose';


@Module({
  imports: [
    ConfigModule.forRoot(),
    CapsuleModule,
    MongooseModule.forRoot(process.env.MONGO_DB)
  ],
  controllers: [CapsulesController],
  providers: [],
})
export class AppModule {}
