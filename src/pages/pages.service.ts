import { Injectable, OnModuleInit } from '@nestjs/common';
import { CreatePageDto } from './dto/create-page.dto';
import { UpdatePageDto } from './dto/update-page.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Page } from './entities/page.entity';

@Injectable()
export class PagesService implements OnModuleInit {
	constructor(
		@InjectModel(Page)
		private pageRepository: typeof Page,
	) {}

	async onModuleInit() {
		await this.pageRepository.sync();
	}

	create(createPageDto: CreatePageDto) {
		const page = new this.pageRepository(createPageDto);
		page.save();
		return page;
	}

	findAll() {
		return `This action returns all pages`;
	}

	findOne(id: number) {
		return `This action returns a #${id} page`;
	}

	update(id: number, updatePageDto: UpdatePageDto) {
		return `This action updates a #${id} page`;
	}

	remove(id: number) {
		return `This action removes a #${id} page`;
	}
}
