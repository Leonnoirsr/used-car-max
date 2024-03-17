import { forwardRef, Module } from '@nestjs/common';
import { AuthService }        from './auth.service';
import { AuthController }     from './auth.controller';
import { UsersService }       from '../../users/users.service';
import { JwtModule }          from '@nestjs/jwt';
import { UsersModule }        from '../../users/users.module';
import { PassportModule }     from '@nestjs/passport';
import { LocalStrategy }      from '../strategies/local.strategy';
import { JwtStrategy }        from '../strategies/jwt.strategy';

@Module({
	imports: [
		PassportModule,
		JwtModule.register({
			secret: 'oatmeal',
			signOptions: { expiresIn: '1h' },
		}),
		forwardRef(() => UsersModule),
	],

	providers: [AuthService, UsersService, LocalStrategy, JwtStrategy],
	controllers: [AuthController],
	exports: [AuthService, LocalStrategy],
})
export class AuthModule {}
