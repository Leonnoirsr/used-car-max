import { Module } from '@nestjs/common';
import { ReportsController } from './reports.controller';
import { ReportsService } from './reports.service';
import { PrismaService } from '../prisma.service';
import { UsersService } from '../users/users.service';

@Module({
  controllers: [ReportsController],
  providers: [ReportsService, PrismaService, UsersService]
})
export class ReportsModule {}
