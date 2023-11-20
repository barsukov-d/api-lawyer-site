import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('posts')
export class PostsController {
	constructor(private readonly postsService: PostsService) {}

	@ApiTags('posts')
	@Post('create')
	async create(@Body() createPostDto: CreatePostDto) {
		console.log('createPostDto', createPostDto);

		return this.postsService.create(createPostDto);
	}

	@ApiTags('posts')
	@Get()
	findAll() {
		return this.postsService.findAll();
	}

	@ApiTags('posts')
	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.postsService.findOne(+id);
	}

	@ApiTags('posts')
	@Patch(':id')
	update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
		return this.postsService.update(+id, updatePostDto);
	}

	@ApiTags('posts')
	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.postsService.remove(+id);
	}
}
