import { NestFactory }    from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule }      from './app.module';
import { config } from 'dotenv';

const cookieSession = require( 'cookie-session' );

async function bootstrap(){

	config()
	const app = await NestFactory.create( AppModule );
	app.use( cookieSession( {
		keys: [ 'oatmeal' ]
	} ) )
	app.useGlobalPipes(
		new ValidationPipe( {
			whitelist: true
		} )
	)

	app.enableCors({
		origin: process.env.REACT_APP_API_BASE_URL,
		credentials: true,
	});
	app.setGlobalPrefix( 'api' );
	await app.listen( 3001 );
}

bootstrap();
