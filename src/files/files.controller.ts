import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Post,
	UploadedFile,
	UploadedFiles,
	UseGuards,
	UseInterceptors,
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
	@Delete('delete')
	@HttpCode(200)
	@UseGuards(JwtAuthGuard)
	async deleteFile(@Body() body: { fileUuid: string }) {
		return this.filesService.removeFile(body.fileUuid);
	}
}
