import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService }      from '../auth/auth.service';
import { UnauthorizedException } from '@nestjs/common';

export class LocalStrategy extends PassportStrategy(Strategy) {


	constructor(private authService: AuthService) {
		super()
	}

	validate(email: string, password: string) {
		const user = this.authService.signin(email, password);

		if(!user) throw new UnauthorizedException();

		return user;


	}
	
}
