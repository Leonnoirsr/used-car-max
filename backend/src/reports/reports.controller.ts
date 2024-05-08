import { Body, Controller, Get, Post, Delete, Param, UseGuards } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { CreateReportDto } from './dtos/create-report.dto';
import { UsersService } from '../users/users.service';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import { User } from '@prisma/client';
import { JwtGuard } from 'src/guards/jwt.guard';

@Controller('reports')
export class ReportsController {
	constructor(private reportsService: ReportsService, private usersService: UsersService) {}

	@Get('/')
	async getReports() {
		return await this.reportsService.findAll();
	}

	@Get('/user-reports')
	@UseGuards(JwtGuard)
	async getUserReports(@CurrentUser() user: User) {
		return await this.reportsService.findReportsByUser(user.id);
	}

	@Post('/create-report')
	@UseGuards(JwtGuard)
	async sendReport(@Body() body: CreateReportDto, @CurrentUser() user: User) {
		const { year, make, model, type, mileage, price, imageUrl } = body;
		return await this.reportsService.createReport(year, make, model, type, mileage, price, user, imageUrl);
	}

	@Delete('/:id')
	@UseGuards(JwtGuard)
	async deleteReport(@Param('id') id: string) {
		console.log('Report Deleted');
		return await this.reportsService.deleteById(id);
	}
}
