import { ReportsService } from './reports.service';
import { CreateReportDto } from './dtos/create-report.dto';
import { UsersService } from '../users/users.service';
import { User } from '@prisma/client';
export declare class ReportsController {
    private reportsService;
    private usersService;
    constructor(reportsService: ReportsService, usersService: UsersService);
    getReports(): Promise<{
        id: string;
        year: number;
        make: string;
        model: string;
        type: string;
        mileage: number;
        price: number;
        userId: string;
        imageUrl: string;
    }[]>;
    getUserReports(user: User): Promise<{
        id: string;
        year: number;
        make: string;
        model: string;
        type: string;
        mileage: number;
        price: number;
        userId: string;
        imageUrl: string;
    }[]>;
    sendReport(body: CreateReportDto, user: User): Promise<{
        id: string;
        year: number;
        make: string;
        model: string;
        type: string;
        mileage: number;
        price: number;
        userId: string;
        imageUrl: string;
    }>;
}
