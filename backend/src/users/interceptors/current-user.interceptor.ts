import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { UsersService }                                               from '../users.service';

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
	constructor(private usersService   : UsersService){}

	async intercept(context: ExecutionContext, handler: CallHandler) {
		const request                = context.switchToHttp().getRequest(),
			 { userid }              = request.session || {};


		if(userid) {

		request.currentUser = await this.usersService.findById( userid );

		}

		return handler.handle();
	}
}
