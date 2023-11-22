import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigService } from '@nestjs/config';
import { getConfigDB } from './configs/db.config';
import { UsersModule } from './users/users.module';
// import { UsersService } from './users/users.service';
import { PostsModule } from './posts/posts.module';
import { PagesModule } from './pages/pages.module';

@Module({
	imports: [
		ConfigModule.forRoot(),
		SequelizeModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getConfigDB,
		}),
		AuthModule,
		UsersModule,
		PostsModule,
		PagesModule,
	],
	// providers: [UsersService],
})
export class AppModule {}
