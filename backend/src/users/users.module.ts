import { forwardRef, Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PrismaService } from '../prisma.service';
import { AuthService } from '../auth/auth/auth.service';
import { CurrentUserInterceptor } from './interceptors/current-user.interceptor';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from 'src/auth/auth/auth.module';

@Module({
	imports: [forwardRef(() => AuthModule)],
	controllers: [UsersController],
	providers: [UsersService, PrismaService],
})
export class UsersModule {}
