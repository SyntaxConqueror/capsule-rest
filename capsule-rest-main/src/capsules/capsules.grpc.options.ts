import { ClientOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

// Same options object used by microservice server
export const capsulesMicroserviceOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    package: 'capsules',
    protoPath: join(__dirname, '../../src/capsules/capsules.proto'),
    url: "localhost:3001"
  },
};