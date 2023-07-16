import { Injectable } from '@nestjs/common';
import { BufferedFile } from 'src/minio-client/interfaces/file.interface';
import { MinioClientService } from 'src/minio-client/minio-client.service';

@Injectable()
export class FileUploadService {
    constructor(private minioClientService: MinioClientService) { }

    async uploadFile(file: BufferedFile) {
        const uploaded_file = await this.minioClientService.upload(file);

        return {
            file_url: uploaded_file.url,
            message: 'File upload successful',
        };
    }
}
