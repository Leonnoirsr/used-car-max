import {
	Controller,
	Get,
	Post,
	Patch,
	Delete,
	Body,
	Param,
	Query,
	NotFoundException
}                        from '@nestjs/common';
import { UsersService }  from './users.service';
import { User }          from '@prisma/client';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';

@Controller( 'auth' )
export class UsersController {
	constructor( private usersService: UsersService ){}
	
	@Post( '/signup' )
	async createUser( @Body() body: CreateUserDto ): Promise<User>{
		const { email, password, role } = body
		return this.usersService.createUser( email, password, role )
	}
	
	@Get( '/users' )
	async findAll(): Promise<User[]>{
		return this.usersService.findAll()
	}
	
	@Get( 'email' )
	async findByEmail( @Query( 'email' ) email: string ){
		const user = await this.usersService.findByEmail( email )
		if( !user ){
			throw new NotFoundException( `User with email ${ email } not found` );
		}
		return user
	}
	
	@Get( '/:id' )
	async findById( @Param( 'id' ) id: string ){
		const user = await this.usersService.findById( id );
		if( !user ){
			throw new NotFoundException( `User with id ${ id } not found` );
		}
		return user;
	}
	
	@Patch('/updateuser')
	async updateUser( @Query( 'email' ) email: string, @Body() body: UpdateUserDto ){
		
		console.log(body)
		const { newEmail, newRole } = body
		return this.usersService.updateUserByEmail( email, newEmail, newRole )
		
		
	}
	
}
