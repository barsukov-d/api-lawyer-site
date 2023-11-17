import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
	constructor(private readonly userService: UsersService) {}

	@Get('getAllUsers')
	async register() {
		console.log('getAllUsers');

		const allUsers = await this.userService.findAll();
		return allUsers;
	}
}
