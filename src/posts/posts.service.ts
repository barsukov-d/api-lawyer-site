import { Injectable, OnModuleInit } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';
import { InjectModel } from '@nestjs/sequelize';
import { PostTag } from './entities/post-tag.entity';
import { Tag } from 'src/tags/entities/tag.entity';
import { Category } from 'src/categories/entities/category.entity';
import { FindOptions } from 'sequelize/types/model';

@Injectable()
export class PostsService implements OnModuleInit {
	constructor(
		@InjectModel(Post)
		private postRepository: typeof Post,
		@InjectModel(PostTag)
		private postTagRepository: typeof PostTag,
		@InjectModel(Tag)
		private tagRepository: typeof Tag,
	) {}

	async onModuleInit() {
		await this.postRepository.sync();
		await this.postTagRepository.sync();
	}

	async create(createPostDto: CreatePostDto) {
		const post = new this.postRepository(createPostDto);
		await post.save();

		if (createPostDto.tagIds && createPostDto.tagIds.length > 0) {
			// Получаем теги по их ID
			const tags = await this.tagRepository.findAll({ where: { id: createPostDto.tagIds } });

			// Добавляем теги к посту
			await post.$add('tags', tags, { through: { attributes: [] } });
		}

		return post;
	}

	async findAll(options?: FindOptions) {
		const posts = await this.postRepository.findAll({
			...options,
			include: [
				{ model: Tag, through: { attributes: [] } }, // exclude PostTag attributes
				{ model: Category },
			],
		});
		return posts;
	}

	async findOne(id: number) {
		const post = await this.postRepository.findOne({
			where: { id },
			include: [
				{ model: Tag, through: { attributes: [] } }, // exclude PostTag attributes
				{ model: Category },
			],
		});
		return post;
	}

	async update(id: number, updatePostDto: UpdatePostDto) {
		await this.postRepository.update(updatePostDto, {
			where: { id },
		});

		// Retrieve the updated post
		const post = await this.postRepository.findOne({ where: { id } });

		if (updatePostDto.tagIds && updatePostDto.tagIds.length > 0) {
			// Получаем теги по их ID
			const tags = await this.tagRepository.findAll({ where: { id: updatePostDto.tagIds } });

			// Удаляем все теги у поста

			await post.$set('tags', []);

			// Добавляем теги к посту
			if (post) {
				await post.$add('tags', tags, { through: { attributes: [] } });
			}
		}

		return post;
	}

	async remove(id: number) {
		const post = await this.postRepository.destroy({
			where: { id },
		});
		return post;
	}
}
