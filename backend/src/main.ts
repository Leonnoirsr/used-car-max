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

	app.enableCors({
		origin: ['https://used-car-e5cuv2ghj-leonnoirsr.vercel.app', 'http://localhost:3000'],
		methods: 'GET, HEAD, PUT, POST, DELETE, OPTIONS, PATCH',
		credentials: true,
		allowedHeaders:
			'Origin, X-Requested-With, Content-Type, Accept, Authentication, Access-control-allow-credentials, Access-control-allow-headers, Access-control-allow-methods, Access-control-allow-origin, User-Agent, Referer, Accept-Encoding, Accept-Language, Access-Control-Request-Headers, Cache-Control, Pragma',
	});
	app.setGlobalPrefix( 'api' );
	await app.listen( 3001 );
}

bootstrap();
