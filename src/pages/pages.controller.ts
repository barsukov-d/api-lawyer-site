import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	ValidationPipe,
	UsePipes,
} from '@nestjs/common';
import { PagesService } from './pages.service';
import { CreatePageDto } from './dto/create-page.dto';
import { UpdatePageDto } from './dto/update-page.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('pages')
export class PagesController {
	constructor(private readonly pagesService: PagesService) {}

	@ApiTags('posts')
	@UsePipes(new ValidationPipe())
	@Post('create')
	async create(@Body() createPageDto: CreatePageDto) {
		return this.pagesService.create(createPageDto);
	}

	@ApiTags('posts')
	@UsePipes(new ValidationPipe())
	@Get()
	findAll() {
		return this.pagesService.findAll();
	}

	@ApiTags('posts')
	@UsePipes(new ValidationPipe())
	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.pagesService.findOne(+id);
	}

	@ApiTags('posts')
	@UsePipes(new ValidationPipe())
	@Patch(':id')
	update(@Param('id') id: string, @Body() updatePageDto: UpdatePageDto) {
		return this.pagesService.update(+id, updatePageDto);
	}

	@ApiTags('posts')
	@UsePipes(new ValidationPipe())
	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.pagesService.remove(+id);
	}
}
