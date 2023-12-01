import { Injectable, OnModuleInit } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { Tag } from './entities/tag.entity';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class TagsService implements OnModuleInit {
	constructor(
		@InjectModel(Tag)
		private tagRepository: typeof Tag,
	) {}

	async onModuleInit() {
		await this.tagRepository.sync();
	}

	create(createTagDto: CreateTagDto) {
		return 'This action adds a new tag';
	}

	findAll() {
		return `This action returns all tags`;
	}

	findOne(id: number) {
		return `This action returns a #${id} tag`;
	}

	update(id: number, updateTagDto: UpdateTagDto) {
		return `This action updates a #${id} tag`;
	}

	remove(id: number) {
		return `This action removes a #${id} tag`;
	}
}
