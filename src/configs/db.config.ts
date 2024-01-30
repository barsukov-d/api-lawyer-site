import { ConfigService } from '@nestjs/config';
import { User } from 'src/users/entities/user.entities';
import { Post } from 'src/posts/entities/post.entity';
import { Page } from 'src/pages/entities/page.entity';
import { Category } from 'src/categories/entities/category.entity';
import { Tag } from 'src/tags/entities/tag.entity';
import { PostTag } from 'src/posts/entities/post-tag.entity';
import { FileInfo } from 'src/files/entities/file.entity';

TODO: 'fix this function to return the config Promise<any>';

export const getConfigDB = async (configService: ConfigService): Promise<any> => {
	return {
		dialect: 'mysql',
		host: configService.get('MYSQL_HOST'),
		port: configService.get('MYSQL_PORT'),
		username: configService.get('MYSQL_USER'),
		password: configService.get('MYSQL_PASSWORD'),
		database: configService.get('MYSQL_DATABASE'),
		synchronize: true,
		models: [User, Category, Post, Tag, Page, PostTag, FileInfo],
		logging: console.log,
	};
};
