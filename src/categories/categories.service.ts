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
		return `This action returns all categories`;
	}

	findOne(id: number) {
		return `This action returns a #${id} category`;
	}

	update(id: number, updateCategoryDto: UpdateCategoryDto) {
		return `This action updates a #${id} category`;
	}

	remove(id: number) {
		return `This action removes a #${id} category`;
	}
}
