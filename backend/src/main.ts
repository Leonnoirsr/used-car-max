import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

const cookieSession = require('cookie-session');

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	app.use(
		cookieSession({
			name: 'session',
			keys: ['oatmeal', 'raisin'],
			maxAge: 24 * 60 * 60 * 1000, // 24 hours
			secure: false, // Set to true if using HTTPS
			httpOnly: false,
		}),
	);

	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
		}),
	);

	app.enableCors({
		origin: 'http://localhost:3000',
		credentials: true,
	});
	app.setGlobalPrefix('api');

	await app.listen(3001);
}

bootstrap();
