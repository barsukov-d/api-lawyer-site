import { Body, Controller, Post } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { HttpCode } from '@nestjs/common';

@Controller('auth')
export class AuthController {
	@Post('register')
	async register(@Body() dto: AuthDto) {
		console.log(dto);
	}

	@HttpCode(200)
	@Post('login')
	async login(@Body() dto: AuthDto) {
		console.log(dto);
	}
}
