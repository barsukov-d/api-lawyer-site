import { Injectable, OnModuleInit } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class CategoriesService implements OnModuleInit {
	constructor(
		@InjectModel(Category)
		private categoriesRepository: typeof Category,
	) {}

	async onModuleInit() {
		await this.categoriesRepository.sync();
	}
	async create(createCategoryDto: CreateCategoryDto) {
		const category = new this.categoriesRepository(createCategoryDto);
		await category.save();
		return category;
	}

	findAll() {
		const categories = this.categoriesRepository.findAll();
		return categories;
	}

	findOne(id: number) {
		const category = this.categoriesRepository.findOne({
			where: { id },
		});

		return category;
	}

	update(id: number, updateCategoryDto: UpdateCategoryDto) {
		const category = this.categoriesRepository.update(updateCategoryDto, {
			where: { id },
		});

		return category;
	}

	remove(id: number) {
		const category = this.categoriesRepository.destroy({
			where: { id },
		});

		return category;
	}
}
