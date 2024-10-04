import { Test, TestingModule } from '@nestjs/testing';
import { AlunoService } from './aluno.service';
import { CreateAlunoCommand } from './commands/create-aluno-command';
import { ConflictException, ForbiddenException } from '@nestjs/common';
import { Aluno } from '../domain/aluno';
import { AlunoFactory } from '../domain/factories/aluno-factory';

describe('AlunoService', () => {
  let service: AlunoService;

  const alunoTest = {
    nome: 'João',
    endereco: 'Rua 1',
    email: 'example@example.com',
    anoNascimento: 2000,
  } as CreateAlunoCommand;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AlunoService, AlunoFactory],
    }).compile();

    service = module.get<AlunoService>(AlunoService);
  });

  it('deve estar definido', () => {
    expect(service).toBeDefined();
  });

  it('deve retornar um aluno criado para o controller', async () => {
    const alunoCriado = await service.cadastrar(alunoTest);
    expect(alunoCriado).toBeInstanceOf(Aluno);
    expect(alunoCriado.id).toBeDefined();
    expect(alunoCriado.nome).toBe(alunoTest.nome);
    expect(alunoCriado.endereco).toBe(alunoTest.endereco);
    expect(alunoCriado.email).toBe(alunoTest.email);
    expect(alunoCriado.telefone).toBe(alunoTest.telefone);
    expect(alunoCriado.cursos).toStrictEqual([]);
  });

  it('deve lançar uma ForbiddenException quando a idade da pessoa for menor que 16', () => {
    const alunoTestMenor16 = {
      ...alunoTest,
      anoNascimento: new Date().getFullYear() - 16,
    } as CreateAlunoCommand;

    expect(() => service.cadastrar(alunoTestMenor16)).toThrow(
      ForbiddenException,
    );
  });

  it('não deve persistir a data de nascimento', () => {
    const alunoCriado = service.cadastrar(alunoTest);
    expect(alunoCriado).toBeInstanceOf(Aluno);
    expect(alunoCriado).not.toHaveProperty('anoNascimento');
  });

  it('não deve cadastrar dois alunos com o mesmo email', () => {
    service.cadastrar(alunoTest);
    expect(() => service.cadastrar(alunoTest)).toThrow(ConflictException);
  });
});
