import {
    Controller,
    Post,
    UseInterceptors,
    UploadedFile,
    Get,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileUploadService } from './file-upload.service';
import { BufferedFile } from 'src/minio-client/interfaces/file.interface';

@Controller('file-upload')
export class FileUploadController {
    constructor(private fileUploadService: FileUploadService) { }

    @Post()
    @UseInterceptors(FileInterceptor('file'))
    async uploadImage(@UploadedFile() file: BufferedFile) {
        return await this.fileUploadService.uploadFile(file);
    }
}