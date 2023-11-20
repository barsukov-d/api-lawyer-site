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

	async findAll() {
		const posts = await this.postRepository.findAll();
		return posts;
	}

	async findOne(id: number) {
		const post = await this.postRepository.findOne({
			where: { id },
		});
		return post;
	}

	async update(id: number, updatePostDto: UpdatePostDto) {
		const post = await this.postRepository.update(updatePostDto, {
			where: { id },
		});
		return post;
	}

	async remove(id: number) {
		const post = await this.postRepository.destroy({
			where: { id },
		});
		return post;
	}
}
