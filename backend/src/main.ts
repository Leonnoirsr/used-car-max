import { NestFactory }    from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule }      from './app.module';

const cookieSession = require( 'cookie-session' );

async function bootstrap(){
	const app = await NestFactory.create( AppModule );
	app.use( cookieSession( {
		keys: [ 'oatmeal' ]
	} ) )
	app.useGlobalPipes(
		new ValidationPipe( {
			whitelist: true
		} )
	)
	
	app.enableCors();
	app.setGlobalPrefix( 'api' );
	await app.listen( 3001 );
}

bootstrap();
