import { ConfigService } from '@nestjs/config';
import { User } from 'src/users/entities/user.entities';
import { Post } from 'src/posts/entities/post.entity';
import { Page } from 'src/pages/entities/page.entity';
import { Category } from 'src/categories/entities/category.entity';

TODO: 'fix this function to return the config Promise<any>';

export const getConfigDB = async (configService: ConfigService): Promise<any> => {
	return {
		dialect: 'mysql',
		host: configService.get('HOST'),
		port: configService.get('MYSQL_PORT'),
		username: configService.get('MYSQL_USER'),
		password: configService.get('MYSQL_PASSWORD'),
		database: configService.get('MYSQL_DATABASE'),
		models: [User, Post, Page, Category],
	};
};
