import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	UsePipes,
	ValidationPipe,
	UseGuards,
	Query,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { log } from 'console';

@Controller('posts')
export class PostsController {
	constructor(private readonly postsService: PostsService) {}

	@ApiTags('posts')
	@UsePipes(new ValidationPipe())
	// @UseGuards(JwtAuthGuard)
	@Post()
	async create(@Body() createPostDto: CreatePostDto) {
		console.log('createPostDto', createPostDto);

		return this.postsService.create(createPostDto);
	}

	// @ApiTags('posts')
	// @UsePipes(new ValidationPipe())
	// @Get()
	// findAll() {
	// 	console.log('findAll');

	// 	return this.postsService.findAll();
	// }

	@ApiTags('posts')
	@UsePipes(new ValidationPipe())
	@Get()
	findAll(@Query('page') page: number, @Query('limit') limit: number) {
		console.log('findAll');

		page = page > 0 ? page : 1;
		limit = limit > 0 ? limit : 10;
		const offset = (page - 1) * limit;

		return this.postsService.findAll({
			limit: +limit,
			offset: +offset,
		});
	}

	@ApiTags('posts')
	@UsePipes(new ValidationPipe())
	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.postsService.findOne(+id);
	}

	@ApiTags('posts')
	@UsePipes(new ValidationPipe())
	// @UseGuards(JwtAuthGuard)
	@Patch(':id')
	update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
		return this.postsService.update(+id, updatePostDto);
	}

	@ApiTags('posts')
	@UsePipes(new ValidationPipe())
	// @UseGuards(JwtAuthGuard)
	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.postsService.remove(+id);
	}
}
