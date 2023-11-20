import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreatePageDto {
	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	title: string;

	@ApiProperty()
	@IsString()
	content: string;

	@ApiProperty()
	@IsString()
	slug: string;

	@ApiProperty()
	@IsString()
	metaTitle: string;

	@ApiProperty()
	@IsString()
	metaDescription: string;

	@ApiProperty()
	@IsString()
	metaKeywords: string;
}
