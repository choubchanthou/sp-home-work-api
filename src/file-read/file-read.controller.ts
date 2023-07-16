import { Controller, Get, Param, Res } from '@nestjs/common';
import { FileReadService } from './file-read.service';

@Controller('file-read')
export class FileReadController {
    constructor(private fileReadService: FileReadService) { }

    @Get(':bucketname/:filename')
    async getFile(@Param('bucketname') bucketName: string, @Param('filename') fileName: string, @Res() res) {
        const file = await this.fileReadService.getFile(bucketName, fileName);
        file.pipe(res);
    }
}
