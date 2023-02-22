// user.service.ts
import { Injectable } from '@nestjs/common';
import { User } from '../interfaces/user-interface';
import { UserEntity } from '../interfaces/user-entity';
import { Repository } from 'typeorm';
@Injectable()
export class UserService {
     private users: UserEntity[] = [];

    async create(user: UserEntity) {
        this.users.push({ ...user, id: this.users.length});
    }

    async findAll(): Promise<UserEntity[]> {
        return this.users;
    }
    
    async findOne(id: number):Promise<UserEntity> {
        if (this.users.findIndex(user => user.id.toString() === id.toString()) !== -1){
            return this.users.find(user => user.id.toString() === id.toString());
        }else{
            throw Error();
        }
        
    }

    async update(id: number, user: UserEntity) {
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