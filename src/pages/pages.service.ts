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

	async create(createPageDto: CreatePageDto) {
		const page = new this.pageRepository(createPageDto);
		await page.save();
		return page;
	}

	findAll() {
		const pages = this.pageRepository.findAll();
		return pages;
	}

	findOne(id: number) {
		const page = this.pageRepository.findOne({
			where: { id },
		});
		return page;
	}

	update(id: number, updatePageDto: UpdatePageDto) {
		const page = this.pageRepository.update(updatePageDto, {
			where: { id },
		});
		return page;
	}

	remove(id: number) {
		const page = this.pageRepository.destroy({
			where: { id },
		});
		return page;
	}
}
