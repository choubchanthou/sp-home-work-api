import { Test, TestingModule } from '@nestjs/testing';
import { FileReadService } from './file-read.service';

describe('FileReadService', () => {
  let service: FileReadService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FileReadService],
    }).compile();

    service = module.get<FileReadService>(FileReadService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
