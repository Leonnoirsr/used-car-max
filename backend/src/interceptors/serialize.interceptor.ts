import {
	NestInterceptor,
	ExecutionContext,
	CallHandler, UseInterceptors
} from '@nestjs/common';

import { Observable}      from 'rxjs';
import { map }            from 'rxjs/operators';
import { plainToInstance} from 'class-transformer';
import { Role }           from '@prisma/client';


interface UserDto {
	id: number;
	email: string;
	role: Role;
}

export function Serialize(dto: new () => UserDto) {
	return UseInterceptors(new SerializeInterceptor(dto))
}

export class SerializeInterceptor implements NestInterceptor{
	
	constructor(private dto: new () => any) {
	
	}
	intercept( context: ExecutionContext, next: CallHandler<any> ): Observable<any> | Promise<Observable<any>>{
		return next.handle().pipe(
			map((data: UserDto) => {
			return plainToInstance(this.dto, data, {
				excludeExtraneousValues: true
			})
			})
		)
		
	}
}