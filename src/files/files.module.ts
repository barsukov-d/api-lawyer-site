import { Module } from '@nestjs/common';
import { FilesController } from './files.controller';
import { FilesService } from './files.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { path } from 'app-root-path';
import { SequelizeModule } from '@nestjs/sequelize';
import { FileInfo } from './entities/file.entity';

@Module({
	imports: [
		SequelizeModule.forFeature([FileInfo]),
		ServeStaticModule.forRoot({
			rootPath: `${path}/uploads`,
			serveRoot: '/static',
		}),
	],
	controllers: [FilesController],
	providers: [FilesService],
})
export class FilesModule {}
