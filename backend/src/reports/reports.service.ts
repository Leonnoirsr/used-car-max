import { Injectable }         from '@nestjs/common';
import { PrismaService }      from '../prisma.service';
import { Role, User, Report } from '@prisma/client';
import ObjectId               from 'bson-objectid';

@Injectable()
export class ReportsService {

	constructor( private prisma: PrismaService ){}

	private isValidId( id: string ): boolean{
		return ObjectId.isValid( id )
	}

	async createReport( year: number, make: string, model: string, type: string,  mileage: number, price: number, user: User, imageUrl: string ): Promise<Report>{

		if( !this.isValidId( user.id ) ){
			throw new Error('Invalid UserId');
		}

		const newReport = await this.prisma.report.create( {
			data: {
				year,
				make,
				model,
				type,
				mileage,
				price,
				userId: user.id,
				imageUrl
			}
		} );

		console.log( 'A new report has been created', newReport );
		return newReport

	}

	async findAll(): Promise<Report[]>{
		return this.prisma.report.findMany({
			include: {
				user: true,
			},
		});
	}

	async findReportsByUser(userId: string): Promise<Report[]> {
		return this.prisma.report.findMany({ where: { userId: userId } });
	}

	async findById( id: string ): Promise<Report>{

		if(!this.isValidId(id)) {
			throw new Error('Invalid ID');
		}

		return this.prisma.report.findFirst( { where: { id: id } } )
	}

	async updateById( id: string, newMake: string, newModel: string, newYear: number, newMileage: number, newPrice: number ): Promise<Report>{

		// Check if id is valid
		if( !this.isValidId( id ) ){
			throw new Error('Invalid ID');
		}

		// If report exists find it and update

		const report = await this.prisma.report.findFirst( { where: { id: id } } )

		if( !report ){
			throw new Error('Report not found');
		} else {
			const updatedReport = await this.prisma.report.update( {
				where: {
					id: id
				},
				data:  {
					...( newMake ? { make: newMake } : {} ),
					...( newModel ? { model: newModel } : {} ),
					...( newYear ? { year: newYear } : {} ),
					...( newMileage ? { mileage: newMileage } : {} ),
					...( newPrice ? { price: newPrice } : {} ),
				}
			} );
			console.log( 'Report Updated', updatedReport )
			return updatedReport
		}
	}

	async deleteById( id: string ){

		// Check if id is valid
		if( !this.isValidId( id ) ){
			throw new Error('Invalid ID');
		}

		// find report
		const report = await this.prisma.report.findFirst( { where: { id: id } } )

		if( !report ){
			throw new Error('Report not found');
		} else {
			await this.prisma.report.delete( {
				where: {
					id: id
				}
			} );
			console.log('Report Deleted', report);
			return report;
		}

	}

}
