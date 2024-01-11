import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	Post,
	UploadedFile,
	UploadedFiles,
	UseGuards,
	UseInterceptors,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { FileElementResponse } from './dto/file-element.response';
import { FilesService } from './files.service';
import { MFile } from './dto/mfile.class';
import { ApiTags, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { FilesUploadDto } from './dto/files-upload.dto';

@Controller('files')
export class FilesController {
	constructor(private readonly filesService: FilesService) {}

	@ApiTags('files')
	@Post('upload')
	@HttpCode(200)
	// @UseGuards(JwtAuthGuard)
	@UseInterceptors(FilesInterceptor('files'))
	@ApiConsumes('multipart/form-data')
	@ApiBody({
		description: 'Upload files',
		type: FilesUploadDto,
	})
	async uploadFile(
		@UploadedFiles() files: Array<Express.Multer.File>,
	): Promise<FileElementResponse[]> {
		const saveArray: MFile[] = [];
		for (const file of files) {
			if (file.mimetype.includes('image')) {
				const buffer = await this.filesService.convertToWebP(file.buffer);
				saveArray.push(
					new MFile({
						originalname: `${file.originalname.split('.')[0]}.webp`,
						buffer: buffer,
					}),
				);
			}
			saveArray.push(new MFile(file));
		}

		return this.filesService.saveFiles(saveArray);
	}

	@ApiTags('files')
	@Get('all')
	async getAllFiles() {
		return this.filesService.getAllFiles();
	}

	@ApiTags('files')
	@Get('all-webp')
	async getAllFilesByWebP() {
		return this.filesService.getAllFilesByWebP();
	}

	@ApiTags('files')
	@UsePipes(new ValidationPipe())
	@Delete(':id')

	// @UseGuards(JwtAuthGuard)
	remove(@Param('id') id: string) {
		return this.filesService.removeFile(id);
	}

	// @ApiTags('posts')
	// @UsePipes(new ValidationPipe())
	// // @UseGuards(JwtAuthGuard)
	// @Delete(':id')
	// remove(@Param('id') id: string) {
	// 	return this.postsService.remove(+id);
	// }
}
