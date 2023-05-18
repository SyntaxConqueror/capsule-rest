import { ClientOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

// Same options object used by microservice server
export const feedbacksMicroserviceOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    package: 'feedbacks',
    protoPath: join(__dirname, '../../src/feedbacks/feedbacks.proto'),
    url: "localhost:3002"
  },
};