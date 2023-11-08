import { Injectable }    from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Role, User }    from '@prisma/client';
import ObjectID          from 'bson-objectid';

@Injectable()
export class UsersService {
	constructor( private prisma: PrismaService ){}
	
	// Create function
	
	async createUser( email: string, password: string, role: Role ): Promise<User>{
		
		const newUser = await this.prisma.user.create( {
			data: {
				email,
				password,
				role,
			}
		} );
		console.log( 'A new user has been created', newUser );
		return newUser
	}
	
	// Read functions
	
	async findAll(): Promise<User[]>{
		return this.prisma.user.findMany()
	}
	
	async findById( id: string ){
		if( !ObjectID.isValid( id ) ){
			return null;
		}
		return this.prisma.user.findFirst( { where: { id } } );
	}
	
	async findByEmail( email: string ): Promise<User | null>{
		return this.prisma.user.findFirst( { where: { email: email } } )
	}
	
	// Update function
	
	async updateUserByEmail( oldEmail: string, newEmail: string, newRole: Role ): Promise<User | null>{
		
		// Check if new email is already in use
		if( newEmail ){
			const emailInUse = await this.prisma.user.findFirst( { where: { email: newEmail } } );
			if( emailInUse ){
				throw new Error( 'Email is already in use' );
			}
		}
		
		// Check if the new role is valid
		if( newRole && !Object.values( Role ).includes( newRole ) ){
			throw new Error( 'Invalid role' );
		}
		
		// Find user and update
		
		const user = await this.prisma.user.findFirst( { where: { email: oldEmail } } )
		
		if( !user ){
			return null
		} else {
			
			const updatedUser = await this.prisma.user.update( {
				where: {
					email: oldEmail
				},
				data:  {
					
					...( newEmail ? { email: newEmail } : {} ),
					...( newRole ? { role: newRole } : {} )
				}
			} );
			console.log('User Updated', updatedUser)
			return updatedUser;
		}
		
	}
	
	// Delete Function
	
}
