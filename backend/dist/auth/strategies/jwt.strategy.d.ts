import { Strategy } from 'passport-jwt';
import { AuthService } from '../auth/auth.service';
interface JwtPayload {
    sub: string;
    email: string;
    role: string;
}
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private authService;
    constructor(authService: AuthService);
    validate(payload: JwtPayload): Promise<JwtPayload>;
}
export {};
