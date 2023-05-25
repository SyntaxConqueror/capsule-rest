import { Module } from '@nestjs/common';
import { UsersSearchService } from './users-search.service';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersSearchController } from './users-search.controller';

@Module({
  imports: [
    ConfigModule,
    ElasticsearchModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        node: configService.get('ELASTICSEARCH_NODE'),
        auth: {
          username: configService.get('ELASTICSEARCH_USERNAME'),
          password: configService.get('ELASTICSEARCH_PASSWORD'),
        }
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [UsersSearchService],
  exports: [ElasticsearchModule, UsersSearchService],
  controllers: [UsersSearchController]
})
export class UsersSearchModule {}
