import { Injectable, OnModuleInit } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

import { Post } from './entities/post.entity';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class PostsService implements OnModuleInit {
	constructor(
		@InjectModel(Post)
		private postRepository: typeof Post,
	) {}
	async onModuleInit() {
		await this.postRepository.sync();
	}

	async create(createPostDto: CreatePostDto) {
		const post = new this.postRepository(createPostDto);
		await post.save();
		return post;
	}

	findAll() {
		return `This action returns all posts`;
	}

	findOne(id: number) {
		return `This action returns a #${id} post`;
	}

	update(id: number, updatePostDto: UpdatePostDto) {
		return `This action updates a #${id} post`;
	}

	remove(id: number) {
		return `This action removes a #${id} post`;
	}
}
