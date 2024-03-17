import { AuthGuard }                    from '@nestjs/passport';
import { ExecutionContext, Injectable } from '@nestjs/common';
import { Observable }                   from 'rxjs';


@Injectable()
export class LocalGuard extends AuthGuard('local') {
	canActivate(
		context: ExecutionContext,
	): boolean | Promise<boolean> | Observable<boolean> {
		console.log('Guard is working')
		return super.canActivate(context)
	}
}