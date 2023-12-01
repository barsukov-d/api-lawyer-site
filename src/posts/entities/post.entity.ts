import {
	BelongsTo,
	Column,
	DataType,
	ForeignKey,
	HasMany,
	Model,
	Table,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { Category } from 'src/categories/entities/category.entity';

interface PostCreationAttrs {
	title: string;
	description: string;
	content: string;
	image: string;
	categoryId: number;
	// tags: string[] | string;
	// publicationStatus: string;
	// metaTags: string[] | string;
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
	@ForeignKey(() => Category)
	@Column
	categoryId: number;

	@BelongsTo(() => Category)
	category: Category;

	// @ApiProperty()
	// @Column(DataType.TEXT)
	// tags: string[] | string;

	// @ApiProperty()
	// @Column
	// publicationStatus: string;

	// @ApiProperty()
	// @Column
	// author: string;

	// @ApiProperty()
	// @Column()
	// metaTags: string[] | string;

	// @ApiProperty()
	// @Column
	// permalink: string;
}
