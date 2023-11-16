import { Module }                 from '@nestjs/common';
import { APP_INTERCEPTOR }        from '@nestjs/core';
import { UsersController }        from './users.controller';
import { UsersService }           from './users.service';
import { PrismaService }          from '../prisma.service';
import { AuthService }            from '../auth/auth/auth.service';
import { CurrentUserInterceptor } from './interceptors/current-user.interceptor';

@Module( {
	controllers: [ UsersController ],
	providers:   [
		UsersService,
		PrismaService,
		AuthService,
		{
			provide:  APP_INTERCEPTOR,
			useClass: CurrentUserInterceptor
		}
	
	]
} )
export class UsersModule {}
