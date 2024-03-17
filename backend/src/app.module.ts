import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma.module';

@Module({
	imports: [PrismaModule, UsersModule, ReportsModule, ConfigModule.forRoot()],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
