import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { UserEntity } from 'src/users/user.entity';

export const getConfigDB = async (configService: ConfigService): Promise<TypeOrmModuleOptions> => {
	return {
		type: 'mysql',
		host: configService.get('HOST'),
		port: configService.get('MYSQL_PORT'),
		username: configService.get('MYSQL_USER'),
		password: configService.get('MYSQL_PASSWORD'),
		database: configService.get('MYSQL_DATABASE'),
		entities: [UserEntity],
		synchronize: false,
	};
};
