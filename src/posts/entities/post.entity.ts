import { Column, Model, Table } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

interface PostCreationAttrs {
	title: string;
	content: string;
}

@Table({ tableName: 'posts_entity' })
export class Post extends Model<Post, PostCreationAttrs> {
	@ApiProperty()
	@Column
	title: string;

	@ApiProperty()
	@Column
	description: string;

	@ApiProperty()
	@Column
	content: string;

	@ApiProperty()
	@Column
	image: string;

	@ApiProperty()
	@Column
	categories: string[];

	@ApiProperty()
	@Column
	tags: string[];

	@ApiProperty()
	@Column
	publicationStatus: string;

	@ApiProperty()
	@Column
	author: string;

	@ApiProperty()
	@Column
	metaTags: string[];

	@ApiProperty()
	@Column
	permalink: string;
}
