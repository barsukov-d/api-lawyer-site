import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModel } from './user.model';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Module({
	imports: [SequelizeModule.forFeature([UserModel])],
	providers: [UsersService],
	controllers: [UsersController],
})
export class UsersModule {}
