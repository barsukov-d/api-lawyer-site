import { Injectable, OnModuleInit, UnauthorizedException } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { User } from 'src/users/entities/user.entities';
import { InjectModel } from '@nestjs/sequelize';
import { compare, genSalt, hash } from 'bcryptjs';
import { USER_NOT_FOUND_ERROR, WRONG_PASSWORD_ERROR } from './auth.const';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService implements OnModuleInit {
	constructor(
		@InjectModel(User)
		private userRepository: typeof User,
		private readonly jwtService: JwtService,
	) {}
	async onModuleInit() {
		await this.userRepository.sync();
	}

	async createUser(dto: AuthDto) {
		const salt = await genSalt(10);
		const newUser = new User();
		newUser.email = dto.login;
		newUser.passwordHash = await hash(dto.password, salt);

		return newUser.save();
	}

	async findUser(email: string) {
		return this.userRepository.findOne({ where: { email } });
	}

	async validateUser(email: string, password: string): Promise<Pick<User, 'email'>> {
		const user = await this.findUser(email);
		if (!user) {
			throw new UnauthorizedException(USER_NOT_FOUND_ERROR);
		}

		const isCorrectPassword = await compare(password, user.passwordHash);
		if (!isCorrectPassword) {
			throw new UnauthorizedException(WRONG_PASSWORD_ERROR);
		}

		return { email: user.email };
	}

	async login(email: string) {
		const payload = { email };
		return {
			accessToken: await this.jwtService.signAsync(payload),
		};
	}
}
