import { Expose} from 'class-transformer';
import { Role }  from '@prisma/client';

export class ReportDto {
	
	@Expose()
	id: number;
	
	@Expose()
	email: string;
	
	@Expose()
	role: Role
	
}