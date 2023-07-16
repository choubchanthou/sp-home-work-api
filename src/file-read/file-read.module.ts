import { Module } from '@nestjs/common';
import { FileReadService } from './file-read.service';
import { FileReadController } from './file-read.controller';
import { MinioClientModule } from 'src/minio-client/minio-client.module';

@Module({
  imports: [MinioClientModule],
  providers: [FileReadService],
  controllers: [FileReadController]
})
export class FileReadModule { }
