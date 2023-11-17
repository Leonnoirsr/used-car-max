import { ConfigService } from '@nestjs/config';
import { Injectable }    from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(private configService: ConfigService) {}
  
  getDatabaseUrl(): string {
    const username = this.configService.get<string>('DB_USERNAME');
    const password = this.configService.get<string>('DB_PASSWORD');
    const dbName = this.configService.get<string>('DB_NAME');
    
    return `mongodb+srv://${username}:${password}@nest-used-car-max.sukl05a.mongodb.net/${dbName}`;
  }
}