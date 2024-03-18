import { IsEmail, IsString } 				from 'class-validator';
import { Role } 							from '@prisma/client';

export class CreateUserDto {

    @IsString()
    firstName: string

    @IsString()
    lastName: string

    @IsEmail()
    email: string;

    @IsString()
    password: string;

    role: Role;
}
