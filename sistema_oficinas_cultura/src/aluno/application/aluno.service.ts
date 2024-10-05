import {
  ConflictException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { CreateAlunoCommand } from './commands/create-aluno-command';
import { AlunoRepository } from './ports/aluno.repository';
import { AlunoFactory } from '../domain/factories/aluno-factory';
import { CursoEntity } from '../infrastructure/persistence/typeorm/entities/curso.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { AlunoEntity } from '../infrastructure/persistence/typeorm/entities/aluno.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AlunoService {
  constructor(
    private readonly alunoFactory: AlunoFactory,
    @InjectRepository(AlunoEntity)
    private readonly alunoRepository: Repository<AlunoEntity>,
    @InjectRepository(CursoEntity)
    private readonly cursoRepository: Repository<CursoEntity>,
  ) {}

  async cadastrar(createAlunoCommand: CreateAlunoCommand) {
    this.validarIdadeMinima(createAlunoCommand);

    const cursos: CursoEntity[] = [];
    for (const nomeCurso of createAlunoCommand.cursos) {
      let curso = await this.cursoRepository.findOne({ where: { name: nomeCurso } })
      if (!curso) {
        curso = this.cursoRepository.create({ name: nomeCurso })
        curso = await this.cursoRepository.save(curso)
      }
      cursos.push(curso);
    }

    const novoAluno = this.alunoFactory.criar(
      createAlunoCommand.nome,
      createAlunoCommand.endereco,
      createAlunoCommand.email,
      createAlunoCommand.telefone,
      cursos
    );

    return this.alunoRepository.save(novoAluno);
  }

  private validarIdadeMinima(createAlunoCommand: CreateAlunoCommand) {
    const anoAtual = new Date().getFullYear();
    const idade = anoAtual - createAlunoCommand.anoNascimento;
    const IDADE_MIN_CADASTRO = 16;
    if (idade <= IDADE_MIN_CADASTRO) {
      throw new ForbiddenException('A idade mínima para cadastro é 16 anos.');
    }
  }

  /* listar() {
    return this.alunoRepository.listar();
  } */
}
