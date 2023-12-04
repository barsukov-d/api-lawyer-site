import { IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Tag } from 'src/tags/entities/tag.entity';

export class CreatePostDto {
	@IsString()
	@ApiProperty()
	title: string;

	@IsString()
	@ApiProperty()
	description: string;

	@IsString()
	@ApiProperty()
	content: string;

	@IsString()
	@ApiProperty()
	image: string;

	@IsNumber()
	@ApiProperty()
	categoryId: number;

	@IsNumber({}, { each: true })
	@ApiProperty({ type: [Number] })
	tagIds: number[];

	@IsString()
	@ApiProperty()
	publicationStatus: string;

	@IsString()
	@ApiProperty()
	author: string;

	@IsString()
	@ApiProperty()
	metaTags: string;
}
