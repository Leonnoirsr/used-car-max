import { Strategy } from 'passport-jwt';
import { AuthService } from '../auth/auth.service';
import { UsersService } from 'src/users/users.service';
interface JwtPayload {
    sub: string;
    email: string;
    role: string;
}
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private authService;
    private usersService;
    constructor(authService: AuthService, usersService: UsersService);
    validate(payload: JwtPayload): Promise<{
        id: string;
        firstName: string;
        lastName: string;
        email: string;
        password: string;
        role: import(".prisma/client").$Enums.Role;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
export {};
