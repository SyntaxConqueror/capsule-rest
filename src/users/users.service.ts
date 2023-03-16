import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NewUserDto } from './dto/new-user.dto';
import { UserDetails } from './user-details.interface';
import { User, UserDocument } from './user.schema';
import * as bcrypt from "bcrypt";
@Injectable()
export class UsersService {
    constructor(@InjectModel("User") private userModel: Model<UserDocument>){}

    _getUserDetails(user: UserDocument):UserDetails{
        return {
            id: user._id,
            name: user.name,
            email: user.email
        }
    }

    async findByEmail(email: string): Promise<UserDocument | null>{
        return this.userModel.findOne({email}).exec();
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
        return this.userModel.find().exec();
    }

    async update(id: string, user:NewUserDto): Promise<User>{
        if (this.userModel.findById(id)){
            const {name, email, password} = user;
            const hashedPassword = bcrypt.hash(password, 10);
            const newUser = {name, email, password: (await hashedPassword).toString()}
            
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
