import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { User } from 'src/schemas/user.schema';
import { UsersSearchService } from './users-search.service';

@Controller('users-search')
export class UsersSearchController {

    constructor(private readonly usersSearchService: UsersSearchService){}

    @MessagePattern({cmd: 'index-user'})
    async indexUser(user: User){
        return await this.usersSearchService.indexUser(user);
    }

    @MessagePattern({cmd: 'search-users'})
    async searchUser(text: string){
        
        return await this.usersSearchService.searchUser(text);
    }
}
