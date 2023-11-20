import { Column, Model, Table } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

interface PostCreationAttrs {
	id: number;
	title: string;
	content: string;
}

@Table({ tableName: 'posts_entity' })
export class Post extends Model<Post, PostCreationAttrs> {
	@ApiProperty()
	@Column({ unique: true })
	title: string;

	@ApiProperty()
	@Column
	content: string;
}
