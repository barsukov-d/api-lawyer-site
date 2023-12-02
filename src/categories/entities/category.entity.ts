import { ApiProperty } from '@nestjs/swagger';

import {
	BelongsTo,
	Column,
	DataType,
	ForeignKey,
	HasMany,
	Model,
	Table,
} from 'sequelize-typescript';
import { Post } from 'src/posts/entities/post.entity';

interface CategoryCreationAttrs {
	name: string;
	posts: Post[];
}

@Table({ tableName: 'categories_entity' })
export class Category extends Model<Category, CategoryCreationAttrs> {
	@Column
	name: string;

	@ApiProperty()
	@HasMany(() => Post)
	posts: Post[];
}
