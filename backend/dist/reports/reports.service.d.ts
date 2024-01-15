import { PrismaService } from '../prisma.service';
import { User, Report } from '@prisma/client';
export declare class ReportsService {
    private prisma;
    constructor(prisma: PrismaService);
    private isValidId;
    createReport(make: string, model: string, year: number, mileage: number, price: number, user: User): Promise<Report>;
    findAll(): Promise<Report[]>;
    findReportsByUser(userId: string): Promise<Report[]>;
    findById(id: string): Promise<Report>;
    updateById(id: string, newMake: string, newModel: string, newYear: number, newMileage: number, newPrice: number): Promise<Report>;
    deleteById(id: string): Promise<{
        id: string;
        make: string;
        model: string;
        year: number;
        mileage: number;
        price: number;
        userId: string;
    }>;
}
