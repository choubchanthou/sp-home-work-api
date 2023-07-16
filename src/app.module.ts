import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MSSQLDBConfigService } from './config/database.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { StaffModule } from './staff/staff.module';
import { FileUploadModule } from './file-upload/file-upload.module';
import { MinioClientModule } from './minio-client/minio-client.module';
import { FileReadModule } from './file-read/file-read.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forRootAsync({
      useClass: MSSQLDBConfigService,
      inject: [MSSQLDBConfigService],
      dataSourceFactory: async (options) => {
        const dataSource = await new DataSource(options).initialize();
        return dataSource;
      },
    }),
    StaffModule,
    MinioClientModule,
    FileUploadModule,
    FileReadModule,
  ],
  controllers: [AppController],
  providers: [AppService, MSSQLDBConfigService],
})
export class AppModule { }
