import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TagsService } from './tags.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('tags')
export class TagsController {
	constructor(private readonly tagsService: TagsService) {}

	@ApiTags('tags')
	@Post()
	create(@Body() createTagDto: CreateTagDto) {
		return this.tagsService.create(createTagDto);
	}

	@ApiTags('tags')
	@Get()
	findAll() {
		return this.tagsService.findAll();
	}

	@ApiTags('tags')
	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.tagsService.findOne(+id);
	}

	@ApiTags('tags')
	@Patch(':id')
	update(@Param('id') id: string, @Body() updateTagDto: UpdateTagDto) {
		return this.tagsService.update(+id, updateTagDto);
	}

	@ApiTags('tags')
	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.tagsService.remove(+id);
	}
}
