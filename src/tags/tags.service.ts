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
		const tag = new this.tagRepository(createTagDto);
		return tag;
	}

	findAll() {
		const tags = this.tagRepository.findAll();
		return tags;
	}

	findOne(id: number) {
		const tag = this.tagRepository.findOne({
			where: { id },
		});

		return tag;
	}

	update(id: number, updateTagDto: UpdateTagDto) {
		const tag = this.tagRepository.update(updateTagDto, {
			where: { id },
		});

		return tag;
	}

	remove(id: number) {
		const tag = this.tagRepository.destroy({
			where: { id },
		});

		return tag;
	}
}
