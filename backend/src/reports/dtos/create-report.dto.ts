import {IsNumber, IsString, Min, Max} from 'class-validator';

export class CreateReportDto {
	
	@IsNumber()
	@Min(1970)
	@Max(2030)
	year: number;
	
	@IsString()
	make: string;
	
	@IsString()
	model: string;
	
	@IsString()
	type: string;
	
	@IsNumber()
	@Min(0)
	@Max(500000)
	mileage: number
	
	@IsNumber()
	@Min(0)
	@Max(1000000)
	price: number
	
	@IsString()
	imageUrl: string;
	
	
	
}