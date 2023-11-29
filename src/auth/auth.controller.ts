import {
	BadRequestException,
	Body,
	Controller,
	Get,
	Param,
	Post,
	UseGuards,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { USER_ALREADY_REGISTERED_ERROR } from './auth.const';
import { JwtAuthGuard } from './guards/jwt.guard';
import { UserEmail } from 'src/decorators/user-email.decorator';
import { ApiTags, ApiResponse, ApiCreatedResponse } from '@nestjs/swagger';
import { User } from 'src/users/entities/user.entities';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@ApiTags('register')
	@UsePipes(new ValidationPipe())
	@Post('register')
	@ApiResponse({
		status: 200,
		description: 'Register user',
		type: User,
	})
	async register(@Body() dto: AuthDto): Promise<User> {
		console.log('test register');
		const oldUser = await this.authService.findUser(dto.login);

		if (oldUser) {
			throw new BadRequestException(USER_ALREADY_REGISTERED_ERROR);
		}

		return this.authService.createUser(dto);
	}

	@ApiTags('auth')
	@ApiResponse({
		status: 400,
		description: 'Login user',
		type: User,
	})
	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post('login')
	async login(@Body() { login, password }: AuthDto): Promise<{ accessToken: string }> {
		const { email } = await this.authService.validateUser(login, password);

		return this.authService.login(email);
	}

	// @ApiTags('auth')
	// @UseGuards(JwtAuthGuard)
	// @Get('test/:id')
	// async test(@Param('id') id: string, @UserEmail() email: string) {
	// 	console.log(id, 'id');
	// 	console.log(email, 'email');

	// 	return id;
	// }
}
