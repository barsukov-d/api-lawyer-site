import { Column, Model, Table } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

interface PostCreationAttrs {
	title: string;
	content: string;
}

@Table({ tableName: 'posts_entity2' })
export class Post extends Model<Post, PostCreationAttrs> {
	@ApiProperty()
	@Column
	title: string;

	@ApiProperty()
	@Column
	content: string;
}
