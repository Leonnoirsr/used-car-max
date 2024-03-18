import { IsEmail, IsEnum, IsOptional } 				from 'class-validator';
import { Role }                        				from '@prisma/client'


export class UpdateUserDto {
	@IsOptional()
	@IsEmail()
	newEmail?: string;
	
	@IsEnum(Role)
	newRole?: Role
}
