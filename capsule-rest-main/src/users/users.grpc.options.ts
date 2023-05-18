import { ClientOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

// Same options object used by microservice server
export const usersMicroserviceOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    package: 'users',
    protoPath: join(__dirname, '../../src/users/users.proto'),
  },
};