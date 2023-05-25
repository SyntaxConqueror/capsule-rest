import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NewUserDto } from './dto/new-user.dto';
import { UserDetails } from './user-details.interface';
import { User, UserDocument } from './user.schema';
import * as bcrypt from "bcrypt";

import e from 'express';
import { ClientProxy, MessagePattern } from '@nestjs/microservices';
import { FilesService } from '../files/files.service';




@Injectable()
export class UsersService {
    constructor(
        @InjectModel("User") private userModel: Model<UserDocument>,
        private filesService: FilesService,
        @Inject("GATEWAY_SERVICE") private gatewayService: ClientProxy,
        @Inject("ES_SERVICE") private readonly esService: ClientProxy,
    ){}

    _getUserDetails(user: UserDocument):UserDetails{
        return {
            id: user._id,
            name: user.name,
            email: user.email,
            avatar: user.avatar
        }
    }


    
    async findByEmail(email: string): Promise<UserDocument | null>{
        return this.userModel.findOne({email}).exec();
    }

    async addAvatar(userId: string, imageBuffer: Buffer, filename: string) {
        
        const avatar = await this.filesService.uploadPublicFile(imageBuffer, filename);
        const user = await this.userModel.findById(userId);
        if(user.avatar != null){
            this.filesService.deletePublicFile(avatar._id);
        }
        user.avatar = avatar;
        await user.save();
        return avatar;
    }

    async deleteAvatar(userId: string) {
        const user = await this.userModel.findById(userId);
        const fileId = user.avatar?._id;
        if (fileId) {
          user.avatar = null;
          await this.filesService.deletePublicFile(fileId)
        }
    }


    async findById(id: string): Promise<UserDetails | null>{
        const user = await this.userModel.findById(id).exec();
        if(!user) return null;
        await this.gatewayService.send({cmd: "find-user"}, {id: id}).subscribe();
        return this._getUserDetails(user);
        
    }

    async findByName(name: string) {
        const user = await this.userModel.find({name: name});
        if(!user) return "No user with this name!";
        return await user;
    }


    
    async create(
        name: string,
        email: string,
        hashedPassword: string
        ): Promise<UserDocument>
    {
        const newUser = new this.userModel({
            name, email, password: hashedPassword
        });
        await this.esService.send({cmd:'index-user'},newUser);
        return newUser.save();
    }

    async findAll(){
        (await this.userModel.find().exec()).forEach((user)=>{
            this.esService.send({cmd: 'index-user'}, user);
        });
        return this.userModel.find().exec();
    }

    async update(data: { id: string, user: NewUserDto }): Promise<User>{
        const {id, user} = data;
        if (this.userModel.findById(id)){
            const {name, email, password} = user;
            let pass = password.toString();
            const hashedPassword = await bcrypt.hash(pass, 10);
            
            const newUser = {name, email, password: hashedPassword}
            
            return this.userModel.findByIdAndUpdate(id, newUser);
        }
        else{
            throw Error();
        }
    }

    async remove(id: string):Promise<User> {
        if (this.userModel.findById(id)){
            return this.userModel.findByIdAndRemove(id);
        }
        else{
            throw Error();
        }
    }

}
