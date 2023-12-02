import { ApiProperty } from '@nestjs/swagger';
import { BelongsToMany, Column, Model, Table } from 'sequelize-typescript';
import { PostTag } from 'src/posts/entities/post-tag.entity';
import { Post } from 'src/posts/entities/post.entity';

export interface PostTagAttrs {
	name: string;
}

@Table({ tableName: 'tag_entity' })
export class Tag extends Model<Tag, PostTagAttrs> {
	@ApiProperty()
	@Column
	name: string;

	@BelongsToMany(() => Post, () => PostTag)
	posts: Post[];
}
