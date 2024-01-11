import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { FileElementResponse } from './dto/file-element.response';
import { format } from 'date-fns';
import { path } from 'app-root-path';
import { ensureDir, readdir, stat, writeFile } from 'fs-extra';
import * as sharp from 'sharp';
import { MFile } from './dto/mfile.class';
import { join } from 'path';
import { InjectModel } from '@nestjs/sequelize';
import { FileInfo } from './entities/file.entity';
import { v4 as uuidv4 } from 'uuid';
import { Op } from 'sequelize';
import { rmdir, unlink } from 'fs/promises';
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

			const newFile = new this.fileInfoRepository({
				fileUuid: uuidv4(),
				name: file.originalname,
				url: `${dateFolder}/${file.originalname}`,
				type: file.mimetype,
			});

			await newFile.save();

			res.push({
				url: `${dateFolder}/${file.originalname}`,
				name: file.originalname,
			});
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

	async getAllFilesByWebP() {
		return this.fileInfoRepository.findAll({
			where: {
				type: {
					[Op.like]: '%image%',
				},
			},
		});
	}

	async deleteEmptyFolder(directoryPath: string): Promise<void> {
		try {
			const files = await readdir(directoryPath);

			if (files.length === 0) {
				await rmdir(directoryPath);
			}
		} catch (err) {
			console.error(`Error while deleting directory ${directoryPath}.`, err);
		}
	}

	async removeFileOnDisk(filePath: string): Promise<void> {
		try {
			await unlink(filePath);
		} catch (err) {
			console.error(`Error while deleting file ${filePath}.`, err);
		}
	}

	async removeFile(fileUuid: string) {
		const file = await this.fileInfoRepository.findOne({
			where: {
				fileUuid,
			},
		});

		this.removeFileOnDisk(`${path}/uploads/${file.url}`);

		await file.destroy();

		this.deleteEmptyFolder(`${path}/uploads/${file.url.split('/')[0]}`);
	}
}
