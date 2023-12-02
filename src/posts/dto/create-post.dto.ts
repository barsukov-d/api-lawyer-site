import { IsString } from 'class-validator';
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

	@IsString({ each: true })
	@ApiProperty()
	categories: string;

	@IsString({ each: true })
	@ApiProperty()
	tags: Tag[];

	// @IsString()
	// @ApiProperty()
	// permalink: string;
}
