import { Module } from '@nestjs/common';
import { PagesService } from './pages.service';
import { PagesController } from './pages.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Page } from './entities/page.entity';

@Module({
	imports: [SequelizeModule.forFeature([Page])],

	controllers: [PagesController],
	providers: [PagesService],
})
export class PagesModule {}
