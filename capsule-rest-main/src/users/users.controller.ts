import { Body, Controller, Delete, Get, OnModuleInit, Param, Post, Put, UseGuards } from '@nestjs/common';
import { usersMicroserviceOptions } from './users.grpc.options';
import { ClientGrpc, Client } from '@nestjs/microservices';
import { IUsersGrpcService } from './users.grpc.interface';
import { User } from './user.schema';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';



@Controller('users')
export class UsersController implements OnModuleInit{
    @Client(usersMicroserviceOptions)
    private client: ClientGrpc;

    private grpcService: IUsersGrpcService;

    onModuleInit() {                                                            
        this.grpcService = this.client.getService<IUsersGrpcService>('UserController'); 
    }
    
    //@UseGuards(JwtGuard)
    @Get(":id")
    async findUser(@Param("id") id: String){
        
        return this.grpcService.findUser({id: id});
    }

    @Get()
    async findAll(){
        return this.grpcService.findAll({});
    }

    
    @Put(":id")
    async update(@Param("id") id: String, @Body() user: User){
        
        const data = {id: {id}, user: user};
        return this.grpcService.update(data);
    }
    @Delete(":id")
    async delete(@Param("id") id: String){
        return this.grpcService.delete({id:id});
    }

}
