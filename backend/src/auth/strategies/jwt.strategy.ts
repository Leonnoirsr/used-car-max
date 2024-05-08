import { Injectable, UnauthorizedException }           from '@nestjs/common';
import { PassportStrategy }                            from '@nestjs/passport';
import { ExtractJwt, Strategy }                        from 'passport-jwt';
import { AuthService }                                 from '../auth/auth.service';
import { UsersService }                                from 'src/users/users.service';



interface JwtPayload {
	sub: string;
	email: string;
	role: string; // Assuming role is always present and is a string
}
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {


	constructor(private authService: AuthService, private usersService: UsersService) {
		super({
			jwtFromRequest  : ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey     : 'oatmeal',
		});
	}

	async validate( payload: JwtPayload ) {
		const user = await this.usersService.findById(payload.sub)

		if(!user) {
			throw new UnauthorizedException()
		}
		return user;
	}


}
