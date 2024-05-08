import { IsEnum,IsNumber, IsString, Min, Max, IsOptional} from 'class-validator';


export enum CarType {
	SUV = 'SUV',
	TRUCK = 'TRUCK',
	CROSSOVER = 'CROSSOVER',
	SEDAN = 'SEDAN',
	COUPE = 'COUPE',
	CONVERTIBLE = 'CONVERTIBLE',
	LUXURY = 'LUXURY',
	SPORTS_CAR = 'SPORTS_CAR',
	MOTORCYCLE = 'MOTORCYCLE',
  }

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
	type: CarType;

	@IsNumber()
	@Min(0)
	@Max(500000)
	mileage: number

	@IsNumber()
	@Min(0)
	@Max(1000000)
	price: number


	@IsOptional()
	@IsString()
	imageUrl: string;



}
