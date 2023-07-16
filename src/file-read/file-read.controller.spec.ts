import { Test, TestingModule } from '@nestjs/testing';
import { FileReadController } from './file-read.controller';

describe('FileReadController', () => {
  let controller: FileReadController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FileReadController],
    }).compile();

    controller = module.get<FileReadController>(FileReadController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
