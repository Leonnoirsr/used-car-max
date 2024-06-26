import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Query, Session, UseGuards } from '@nestjs/common';
import { UsersService }                                                                                    from './users.service';
import { AuthService }                                                                                     from '../auth/auth/auth.service';
import { User }                                                                                            from '@prisma/client';
import { CreateUserDto }                                                                                   from './dtos/create-user.dto';
import { UpdateUserDto }                                                                                   from './dtos/update-user.dto';
import { CurrentUser }                                                                                     from './decorators/current-user.decorator';
import { JwtGuard }                                                                                        from '../guards/jwt.guard';
import { SignInDto }                                                                                       from './dtos/sign-in.dto';



@Controller('auth')



// @Serialize(UserDto)
export class UsersController {
	constructor(
		private usersService: UsersService,
		private authService: AuthService,
	) {}



	@Get('/getuser')
	@UseGuards(JwtGuard)
	whoAmI(@CurrentUser() user: User) {
		return user;
	}




	@Post('/signup')
	async createUser(@Body() body: CreateUserDto, @Session() session: any): Promise<User> {

		const { firstName, lastName, email, password, role } = body,
					user = await this.authService.signup(firstName, lastName, email, password, role);
			    session.userid = user.id;

		return user;
	}



	@Post('/signin')
	async signIn(@Body() body: SignInDto, @Session() session: any) {


		console.log('Signed In')

		const { email, password }         			  = body;

		const user                = await this.authService.signin(email, password),

			  token               = this.authService.generateJwtToken(user),

	    { firstName, lastName }   = user;

		return { firstName, lastName, token }


	}



	@Post('/signout')
	async signOut(@Session() session: any) {


		console.log('Signed Out');

		session.userid = null;
	}




	@Get('/users')
	async findAll(): Promise<User[]> {

		return this.usersService.findAll();

	}


	@Get('email')
	async findByEmail(@Query('email') email: string) {


		const user = await this.usersService.findByEmail(email);

		if (!user) {
			throw new NotFoundException(`User with email ${email} not found`);
		}

		return user;
	}



	@Get('/:id')
	async findById(@Param('id') id: string) {

		const user = await this.usersService.findById(id);

		if (!user) {
			throw new NotFoundException(`User with id ${id} not found`);
		}

		return user;
	}


	@Patch('/update-user')
	async updateUser(@Query('email') email: string, @Body() body: UpdateUserDto) {

		console.log(body);

		const { newEmail, newRole } = body;

		return this.usersService.updateByEmail(email, newEmail, newRole);
	}


	@Delete('/delete-user')
	async deleteUser(@Query('email') email: string) {

		console.log('User Deleted');

		return this.usersService.deleteByEmail(email);
	}
}
