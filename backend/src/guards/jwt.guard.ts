import { AuthGuard }                    				from '@nestjs/passport';
import { Observable }                   				from 'rxjs';
import { ExecutionContext, Injectable } 				from '@nestjs/common';


@Injectable()
export class JwtGuard extends AuthGuard('jwt'){

	canActivate(context: ExecutionContext,
		): boolean | Promise<boolean> | Observable<boolean> {
		console.log('JWT Guard is working');
		return super.canActivate(context)
	}
}
