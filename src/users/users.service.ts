import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserModel } from './user.model';

@Injectable()
export class UsersService {
	constructor(
		@InjectModel(UserModel)
		private userRepository: typeof UserModel,
	) {}

	async findAll(): Promise<UserModel[]> {
		return this.userRepository.findAll();
	}

	async findOne(id: number): Promise<UserModel | null> {
		return this.userRepository.findOne({ where: { id } });
	}

	async remove(id: number): Promise<void> {
		await this.userRepository.destroy({ where: { id } });
	}
}
