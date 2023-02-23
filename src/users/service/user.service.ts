// user.service.ts
import { Injectable } from '@nestjs/common';
import { User } from '../interfaces/user-interface';
import { Repository } from 'typeorm';
@Injectable()
export class UserService {
     private users: User[] = [];

    async create(user: User) {
        this.users.push({ ...user, id: this.users.length});
    }

    async findAll(): Promise<User[]> {
        return this.users;
    }
    
    async findOne(id: number):Promise<User> {
        if (this.users.findIndex(user => user.id.toString() === id.toString()) !== -1){
            return this.users.find(user => user.id.toString() === id.toString());
        }else{
            throw Error();
        }
        
    }

    async update(id: number, user: User) {
        if (this.users.findIndex(user => user.id.toString() === id.toString()) !== -1){
            const index = this.users.findIndex(user => user.id.toString() === id.toString());
            this.users[index] = user;
        }else{
            throw Error();
        }
        
    }

    async remove(id: number) {
        if (this.users.findIndex(user => user.id.toString() === id.toString()) !== -1){
            this.users = this.users.filter(user => user.id.toString() !== id.toString());
        }
        else{
            throw Error();
        }
    }
}