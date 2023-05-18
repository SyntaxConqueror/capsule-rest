import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NewUserDto } from './dto/new-user.dto';
import { UserDetails } from './user-details.interface';
import { User, UserDocument } from './user.schema';
import * as bcrypt from "bcrypt";

import e from 'express';
import { MessagePattern } from '@nestjs/microservices';
import { FilesService } from '../files/files.service';



@Injectable()
export class UsersService {
    constructor(@InjectModel("User") private userModel: Model<UserDocument>,
    private filesService: FilesService){}

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
        console.log(avatar._id);
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
        console.log(fileId);
        if (fileId) {
          user.avatar = null;
          await this.filesService.deletePublicFile(fileId)
        }
    }


    async findById(id: string): Promise<UserDetails | null>{
        const user = await this.userModel.findById(id).exec();
        if(!user) return null;
        return this._getUserDetails(user);
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

        return newUser.save();
    }

    async findAll(){
        const users = await this.userModel.find().exec();
        return {users: users}; 
    }

    async update(data: { id: {id: String}, user: NewUserDto }): Promise<User>{
        const {id, user} = data;
        const Id = id.id;
        if (this.userModel.findById(Id)){
            const {name, email, password} = user;
            let pass = password.toString();
            const hashedPassword = await bcrypt.hash(pass, 10);
            const newUser = {name, email, password: hashedPassword}
            
            return this.userModel.findByIdAndUpdate(Id, newUser);
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
