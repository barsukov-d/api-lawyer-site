import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
	constructor(private readonly userService: UsersService) {}

	@ApiTags('users')
	@Get('getAllUsers')
	async register() {
		console.log('getAllUsers');

		const allUsers = await this.userService.findAll();
		return allUsers;
	}
}
