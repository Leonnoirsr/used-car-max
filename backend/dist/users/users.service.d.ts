import { PrismaService } from '../prisma.service';
import { Role, User } from '@prisma/client';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    createUser(firstName: string, lastName: string, email: string, password: string, role: Role): Promise<User>;
    findAll(): Promise<User[]>;
    findById(id: string): Promise<User>;
    findByEmail(email: string): Promise<User>;
    updateByEmail(oldEmail: string, newEmail: string, newRole: Role): Promise<User | null>;
    deleteByEmail(email: string): Promise<{
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
