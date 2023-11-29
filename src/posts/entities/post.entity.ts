import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

interface PostCreationAttrs {
	title: string;
	description: string;
	content: string;
	image: string;
	categories: string[] | string;
	tags: string[] | string;
	publicationStatus: string;
	metaTags: string[] | string;
	// permalink: string;
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
	@Column(DataType.TEXT)
	content: string;

	@ApiProperty()
	@Column
	image: string;

	@ApiProperty()
	@Column(DataType.TEXT)
	categories: string[] | string;

	@ApiProperty()
	@Column(DataType.TEXT)
	tags: string[] | string;

	@ApiProperty()
	@Column
	publicationStatus: string;

	@ApiProperty()
	@Column
	author: string;

	@ApiProperty()
	@Column(DataType.TEXT)
	metaTags: string[] | string;

	// @ApiProperty()
	// @Column
	// permalink: string;
}
