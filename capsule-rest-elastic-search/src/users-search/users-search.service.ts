import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';

import { EventEmitter } from 'events';
import { User } from 'src/schemas/user.schema';
@Injectable()
export class UsersSearchService {
    index = 'users';
    emitter = new EventEmitter();
    constructor(
        private readonly elasticsearchService: ElasticsearchService
    ) {}
 
    async indexUser(user: User) {
        return await this.elasticsearchService.index<User>({
            index: this.index,
            document: {
                name: user.name,
                email: user.email,
                password: user.password
            }
        })
    }
 
    async searchUser(text: string): Promise<User[]> {
        const body = await this.elasticsearchService.search<User>({
            index: this.index, 
            query: {
                multi_match: {
                    query: text,
                    fields: ['name', 'email'],
                    fuzziness: "AUTO"
                }
            }
        })
        const hits = body.hits.hits;
        return await hits.map((item) => item._source);
    }
}
