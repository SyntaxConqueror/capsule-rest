import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const user = configService.get('RMQ_USER');
  const password = configService.get('RMQ_PASS');
  const host = configService.get('RMQ_HOST');
  const queueName = configService.get('RMQ_QUEUE_WEBSOCKETS');

  await app.connectMicroservice<MicroserviceOptions>({
    
    transport: Transport.RMQ,
    options: {
      urls: [`amqp://${user}:${password}@${host}`],
      queue: queueName,
      queueOptions: {
        durable: true,
      },
    },
  });
  app.startAllMicroservices();
  app.listen(3005);
}
bootstrap();
