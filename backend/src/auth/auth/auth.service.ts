import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { first }                                              from 'rxjs';

@Injectable()
export class AuthService {
	constructor(
		private usersService: UsersService,
		private jwtService: JwtService,
	) {}

	generateJwtToken(user: User) {
		const payload = {  sub: user.id, email: user.email, role: user.role };
		return this.jwtService.sign(payload);
	}

	async signup(firstName: string, lastName: string, email: string, password: string, Role) {
		// See if email is in use

		const user = await this.usersService.findByEmail(email);

		if (user) {
			throw new BadRequestException(`A user with this the email, ${email} already exists. Please signup with a different email`);
		}

		// Hash users password

		const saltRounds = 10;
		const hashedPassword = await bcrypt.hash(password, saltRounds);

		// Create a new user and save it

		// return the user

		return await this.usersService.createUser( firstName, lastName, email, hashedPassword, Role);
	}

	async signin(email: string, password: string) {
		const user = await this.usersService.findByEmail(email);

		if (!user) {
			throw new NotFoundException('User not found');
		}

		if (user) {
			const passwordMatch = await bcrypt.compare(password, user.password);

			if (!passwordMatch) {
				throw new BadRequestException('Invalid Password');
			}

			return user;
		}
	}
}
