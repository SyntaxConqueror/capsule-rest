import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Client, ClientGrpc } from '@nestjs/microservices';
import { ICapsulesGrpcService } from './capsules.grpc.interface';
import { capsulesMicroserviceOptions } from './capsules.grpc.options';
import { Capsule, capsuleDocument } from './schemas/capsule.schema';
import { map } from 'rxjs';


@Controller('capsules')
export class CapsulesController {
    @Client(capsulesMicroserviceOptions)
    private client: ClientGrpc;

    private grpcService: ICapsulesGrpcService;

    onModuleInit() {                                                            
        this.grpcService = this.client.getService<ICapsulesGrpcService>('CapsuleController'); 
    }

    @Get(":id")
    async findOne(@Param("id") id: String){
        this.grpcService.findOne({id: id}).pipe(map((data: any) => {
            return data as Capsule;
        })).subscribe((convertedData: Capsule) => {
            console.log(convertedData.facillitiesList);
        });
        return this.grpcService.findOne({id: id});
    }

    @Get()
    async findAll(){
        return this.grpcService.findAll({});
    }

    @Post()
    async create(@Body() capsule: Capsule){
        return await this.grpcService.create(capsule);
    }

    @Put(":id")
    async update(@Param("id") id: string, @Body() capsule: Capsule){
        const data = {id: id, capsule: capsule};
        return await this.grpcService.update(data);
    }

    @Delete(":id")
    async remove(@Param("id") id: string){
        return this.grpcService.remove({id: id});
    }
}
