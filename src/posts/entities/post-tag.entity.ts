import { Column, ForeignKey, Model } from 'sequelize-typescript';
import { Post } from './post.entity';
import { Tag } from 'src/tags/entities/tag.entity';

export interface PostTagAttrs {
	postId: number;
	tagId: number;
}

export class PostTag extends Model<PostTag, PostTagAttrs> {
	@ForeignKey(() => Post)
	@Column
	postId: number;

	@ForeignKey(() => Tag)
	@Column
	tagId: number;
}
