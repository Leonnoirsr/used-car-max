import { Expose} 								from 'class-transformer';
import { Role, Report }  						from '@prisma/client';

export class UserDto {

	@Expose()
	id: number;

	@Expose()
	email: string;

	@Expose()
	role: Role


}
