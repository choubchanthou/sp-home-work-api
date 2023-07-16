import { Injectable } from '@nestjs/common';
import { MinioClientService } from 'src/minio-client/minio-client.service';

@Injectable()
export class FileReadService {
    constructor(private minioClientService: MinioClientService) { }

    async getFile(bucketName: string, fileName: string) {
        return await this.minioClientService.getFile(bucketName, fileName);
    }
}
