// user.service.ts
import { Injectable } from '@nestjs/common';
// import { User } from '../interfaces/user-interface';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../schemas/users.schemas';
import { Model } from 'mongoose';
@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>){}
    private users: User[] = [];

    async create(user: User): Promise<User> {
        // this.userModel.push({ ...user, id: this.userModel.length});
        const newUser = new this.userModel(user);
        return newUser.save();
    }

    async findAll(): Promise<User[]> {
        return this.userModel.find().exec();
    }
    
    async findOne(id: string):Promise<User> {
        // if (this.userModel.findIndex(user => user.id.toString() === id.toString()) !== -1){
        //     return this.userModel.find(user => user.id.toString() === id.toString());
        // }else{
        //     throw Error();
        // }
        return this.userModel.findById(id);
        
    }

    async update(id: string, user: User):Promise<User> {
        // if (this.userModel.findIndex(user => user.id.toString() === id.toString()) !== -1){
        //     const index = this.userModel.findIndex(user => user.id.toString() === id.toString());
        //     this.userModel[index] = user;
        // }else{
        //     throw Error();
        // }
        return this.userModel.findByIdAndUpdate(id, {new: true});
        
    }

    async remove(id: string):Promise<User> {
        // if (this.userModel.findIndex(user => user.id.toString() === id.toString()) !== -1){
        //     this.userModel = this.userModel.filter(user => user.id.toString() !== id.toString());
        // }
        // else{
        //     throw Error();
        // }
        return this.userModel.findByIdAndRemove(id);
    }

}