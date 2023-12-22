import { Injectable, OnModuleInit } from '@nestjs/common';
import { FileElementResponse } from './dto/file-element.response';
import { format } from 'date-fns';
import { path } from 'app-root-path';
import { ensureDir, readdir, stat, writeFile } from 'fs-extra';
import * as sharp from 'sharp';
import { MFile } from './dto/mfile.class';
import { join } from 'path';
import { InjectModel } from '@nestjs/sequelize';
import { FileInfo } from './entities/file.entity';

@Injectable()
export class FilesService implements OnModuleInit {
	constructor(
		@InjectModel(FileInfo)
		private fileInfoRepository: typeof FileInfo,
	) {}

	async onModuleInit() {
		await this.fileInfoRepository.sync();
	}

	async saveFiles(files: MFile[]): Promise<FileElementResponse[]> {
		const dateFolder = format(new Date(), 'yyyy-MM-dd');
		const uploadFolder = `${path}/uploads/${dateFolder}`;
		await ensureDir(uploadFolder);
		const res: FileElementResponse[] = [];

		for (const file of files) {
			await writeFile(`${uploadFolder}/${file.originalname}`, file.buffer);

			res.push({
				url: `${dateFolder}/${file.originalname}`,
				name: file.originalname,
			});

			const newFile = this.fileInfoRepository.create({
				name: file.originalname,
				url: `${dateFolder}/${file.originalname}`,
				uploadDate: new Date(),
				type: 'file.mimetype',
				size: 22,
			});
			await (await newFile).save();
		}

		return res;
	}

	convertToWebP(file: Buffer): Promise<Buffer> {
		return sharp(file).webp().toBuffer();
	}

	private async getFilesFromDir(dirPath: string): Promise<FileElementResponse[]> {
		const folders = await readdir(dirPath);
		const filesPromises = folders.map(async (folder) => {
			const folderPath = join(dirPath, folder);
			const stats = await stat(folderPath);
			if (stats.isDirectory()) {
				const files = await readdir(folderPath);
				return files.map((file) => ({
					name: file,
					url: `${folder}/${file}`, // adjust this according to how you generate URLs
				}));
			}
			return [];
		});
		const filesInFolders = await Promise.all(filesPromises);
		return filesInFolders.flat();
	}

	async getAllFiles(): Promise<FileElementResponse[]> {
		const files = await this.getFilesFromDir(`${path}/uploads`);
		return files;
	}
}
