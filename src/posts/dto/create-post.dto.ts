import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

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
	categories: string[];

	@IsString({ each: true })
	@ApiProperty()
	tags: string[];

	@IsString()
	@ApiProperty()
	publicationStatus: string;

	@IsString()
	@ApiProperty()
	author: string;

	@IsString({ each: true })
	@ApiProperty()
	metaTags: string[];

	@IsString()
	@ApiProperty()
	permalink: string;
}
