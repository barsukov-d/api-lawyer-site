import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateCategoryDto {
	@IsString()
	@ApiProperty()
	name: string;

	@IsNumber()
	@ApiProperty()
	postId: number;
}
