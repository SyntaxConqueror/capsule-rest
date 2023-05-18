import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { Transport } from '@nestjs/microservices';
import { join } from 'path';

const microserviceOptions = {
  transport: Transport.GRPC,
  options: {
    package: 'users',
    protoPath: join(__dirname, '../src/users/users.proto'),
  },
};

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, microserviceOptions);
  app.listen();
}
bootstrap();