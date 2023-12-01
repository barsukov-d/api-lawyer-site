import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Post } from './entities/post.entity';
import { PostTag } from './entities/post-tag.entity';

@Module({
	imports: [SequelizeModule.forFeature([Post])],
	controllers: [PostsController],
	providers: [PostsService],
})
export class PostsModule {}
