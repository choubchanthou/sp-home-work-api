import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";

@Injectable()
export class MSSQLDBConfigService implements TypeOrmOptionsFactory {

    constructor(private configService: ConfigService) { }

    createTypeOrmOptions(): TypeOrmModuleOptions {
        return {
            type: 'mssql',
            url: this.configService.get<string>('DATABASE_URL'),
            // entities: [__dirname + '/**/*.entity{.ts,.js}'],
            entities: [__dirname + '/../**/*.entity.js'],
            synchronize: true,
            options: {
                encrypt: false
            }
        };
    }
}