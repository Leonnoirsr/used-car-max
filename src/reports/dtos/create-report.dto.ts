import {IsNumber, IsString, Min, Max} from 'class-validator';

export class CreateReportDto {
	@IsString()
	make: string;
	
	@IsString()
	model: string;
	
	@IsNumber()
	@Min(1970)
	@Max(2030)
	year: number;
	
	@IsNumber()
	@Min(0)
	@Max(500000)
	mileage: number
	
	@IsNumber()
	@Min(0)
	@Max(1000000)
	price: number
}