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

    async register(name: string, email: string, password: string): Promise<User> {
        const existingUser = await this.userModel.findOne({ email }).exec();
        if (existingUser) {
          throw new Error('User already exists');
        }
        const newUser = new this.userModel({ name, email, password});
        return newUser.save();
    }

    async create(user: User): Promise<User> {
        const newUser = new this.userModel(user);
        return newUser.save();
    }

    async findAll(): Promise<User[]> {
        return this.userModel.find().exec();
    }
    
    async findOne(id: string):Promise<User> {
        if(this.userModel.findById(id)){
            return this.userModel.findById(id);    
        }
        else{
            throw Error();
        }
    }

    async update(id: string, user: User):Promise<User> {
        if (this.userModel.findById(id)){
            return this.userModel.findByIdAndUpdate(id, {new: true});
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