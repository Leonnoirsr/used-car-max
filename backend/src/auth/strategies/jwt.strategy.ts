import { Injectable }       from '@nestjs/common';
import { PassportStrategy }     from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService }          from '../auth/auth.service';



interface JwtPayload {
	sub: string;
	email: string;
	role: string; // Assuming role is always present and is a string
}
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(private authService: AuthService) {
		super({
			jwtFromRequest  : ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey     : 'oatmeal',
		});
	}
	
	async validate( payload: JwtPayload ) {
		return payload
	}
}
