import { Test, TestingModule } from '@nestjs/testing';
import { AlunoController } from './aluno.controller';
import { AlunoService } from '../../application/aluno.service';

describe('AlunoController', () => {
  let controller: AlunoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AlunoController],
      providers: [AlunoService],
    }).compile();

    controller = module.get<AlunoController>(AlunoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
