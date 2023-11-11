import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const getConfigDB = async (configService: ConfigService): Promise<TypeOrmModuleOptions> => {
	return {
		type: 'mysql',
		host: 'localhost',
		port: 3306,
		username: configService.get('MYSQL_USER'),
		password: configService.get('MYSQL_PASSWORD'),
		database: configService.get('MYSQL_DATABASE'),
		entities: [],
		synchronize: true,
	};
};
