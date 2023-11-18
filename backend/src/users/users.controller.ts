import {
	Controller,
	Get,
	Post,
	Patch,
	Delete,
	Body,
	Param,
	Query,
	NotFoundException,
	Session,
	UseGuards
}                                from '@nestjs/common';
import { UsersService }          from './users.service';
import { AuthService }           from '../auth/auth/auth.service';
import { User }                  from '@prisma/client';
import { CreateUserDto }         from './dtos/create-user.dto';
import { UpdateUserDto }         from './dtos/update-user.dto';
import { Serialize }             from '../interceptors/serialize.interceptor';
import { UserDto }               from './dtos/user.dto';
import { CurrentUser } from './decorators/current-user.decorator';
import { AuthGuard }   from '../guards/auth.guard';

@Controller( 'auth' )
@Serialize( UserDto )

export class UsersController {
	constructor( private usersService: UsersService, private authService: AuthService ){}
	
	
	@Get('/whoami')
//	@UseGuards(AuthGuard)
	whoAmI(@CurrentUser() user: User) {
		return user
	}
	
	@Post( '/signup' )
	async createUser( @Body() body: CreateUserDto, @Session() session: any ): Promise<User>{
		const { email, password, role } = body;
		const user = await this.authService.signup( email, password, role )
		console.log('Signed Up')
		session.userid = user.id
		
		return user
	}
	
	@Post( '/signin' )
	async signIn( @Body() body: CreateUserDto, @Session() session: any ){
		const { email, password } = body;
		const user = await this.authService.signin( email, password )
		console.log('Signed in')
		session.userid = user.id
		
		return user
	}
	
	@Post('/signout')
	async signOut(@Session() session:any) {
		console.log('Signed Out')
		session.userid = null;
	}
	
	@Get( '/users' )
	async findAll(): Promise<Pick<User, 'id'>[]>{
		return this.usersService.findAll();
	}
	
	@Get( 'email' )
	async findByEmail( @Query( 'email' ) email: string ){
		const user = await this.usersService.findByEmail( email );
		if( !user ){
			throw new NotFoundException( `User with email ${ email } not found` );
		}
		return user;
	}
	
	@Get( '/:id' )
	async findById( @Param( 'id' ) id: string ){
		const user = await this.usersService.findById( id );
		if( !user ){
			throw new NotFoundException( `User with id ${ id } not found` );
		}
		return user;
	}
	
	@Patch( '/update-user' )
	async updateUser( @Query( 'email' ) email: string, @Body() body: UpdateUserDto ){
		console.log( body );
		const { newEmail, newRole } = body;
		return this.usersService.updateByEmail( email, newEmail, newRole );
	}
	
	@Delete( '/delete-user' )
	async deleteUser( @Query( 'email' ) email: string ){
		console.log( 'User Deleted' );
		return this.usersService.deleteByEmail( email );
	}
}
