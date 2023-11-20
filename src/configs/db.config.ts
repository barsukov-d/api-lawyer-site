import { ConfigService } from '@nestjs/config';
import { UserModel } from 'src/users/user.model';
import { Post } from 'src/posts/entities/post.entity';

TODO: 'fix this function to return the config Promise<any>';

export const getConfigDB = async (configService: ConfigService): Promise<any> => {
	return {
		dialect: 'mysql',
		host: configService.get('HOST'),
		port: configService.get('MYSQL_PORT'),
		username: configService.get('MYSQL_USER'),
		password: configService.get('MYSQL_PASSWORD'),
		database: configService.get('MYSQL_DATABASE'),
		models: [UserModel, Post],
	};
};
