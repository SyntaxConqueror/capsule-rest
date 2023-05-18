import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService} from '@nestjs/config';
import {JwtModule} from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtGuard } from './guards/jwt.guard';
import { JwtStrategy } from './guards/jwt.strategy';
import { UsersService } from 'src/users/users.service';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/users/user.schema';
import { PublicFileSchema } from 'src/files/entities/publicFile.schema';
import { FilesService } from 'src/files/files.service';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: "User", schema: UserSchema
    }, {name: "PublicFile", schema: PublicFileSchema}]),
    UsersModule,
    PassportModule,
    ConfigModule.forRoot(),
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.JWT_SECRET,
        signOptions: {expiresIn: "3600s"}
      })
    }),

  ],
  controllers: [AuthController],
  providers: [AuthService, 
    JwtGuard, 
    JwtStrategy,
    UsersService,
    FilesService
  ],
  exports:[AuthService]
})
export class AuthModule {}
