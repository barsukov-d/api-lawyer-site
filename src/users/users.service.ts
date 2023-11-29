import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './entities/user.entities';

@Injectable()
export class UsersService implements OnModuleInit {
	constructor(
		@InjectModel(User)
		private userRepository: typeof User,
	) {}
	async onModuleInit() {
		await this.userRepository.sync();
	}

	async findAll(): Promise<User[]> {
		return this.userRepository.findAll();
	}

	async findOne(id: number): Promise<User | null> {
		return this.userRepository.findOne({ where: { id } });
	}

	async remove(id: number): Promise<void> {
		await this.userRepository.destroy({ where: { id } });
	}
}
