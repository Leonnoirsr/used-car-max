import { NestFactory }    from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule }      from './app.module';
import {ExpressAdapter} from "@nestjs/platform-express";
import * as express from 'express';

const cookieSession = require( 'cookie-session' );

async function bootstrap(){
	const server = express();
	const app = await NestFactory.create( AppModule, new ExpressAdapter(server) );

	app.use( cookieSession( {
		keys: [ 'oatmeal' ]
	} ) )
	app.useGlobalPipes(
		new ValidationPipe( {
			whitelist: true
		} )
	)

	app.enableCors({
		origin: 'https://used-car-max.vercel.app/',
		credentials: true,
	});
	app.setGlobalPrefix( 'api' );

	await app.init();
}

bootstrap();
