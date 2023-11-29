import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	const config = new DocumentBuilder()
		.setTitle('Lawyer API')
		.setDescription('The Lawyer API description')
		.setVersion('1.0')
		// .addTag('lawyer-api')
		.build();
	const document = SwaggerModule.createDocument(app, config, {
		ignoreGlobalPrefix: true,
	});
	SwaggerModule.setup('/api-docs', app, document);

	app.setGlobalPrefix('api');
	app.enableCors(); // Включение CORS
	await app.listen(3031);
}
bootstrap();
