import { UsersService } from '../../users/users.service';
export declare class AuthService {
    private usersService;
    constructor(usersService: UsersService);
    signup(email: string, password: string, Role: any): Promise<{
        id: string;
        email: string;
        password: string;
        role: import(".prisma/client").$Enums.Role;
        createdAt: Date;
        updatedAt: Date;
    }>;
    signin(email: string, password: string): Promise<{
        id: string;
        email: string;
        password: string;
        role: import(".prisma/client").$Enums.Role;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
