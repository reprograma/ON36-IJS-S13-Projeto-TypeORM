import { Injectable } from '@nestjs/common';
import { AlunoRepository } from '../../../../application/ports/aluno.repository';
import { AlunoEntity } from '../entities/aluno.entity';
import { Aluno } from '../../../../domain/aluno';
// import { AlunoMapper } from '../mappers/aluno.mapper';

@Injectable()
export class InFileAlunoRepository implements AlunoRepository {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  salvar(aluno: Aluno): Promise<Aluno> {
    throw new Error('Method not implemented.');
  }
  listar(): Promise<Aluno[]> {
    throw new Error('Method not implemented.');
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  buscarPorEmail(email: string): Promise<Aluno> {
    throw new Error('Method not implemented.');
  }
  private readonly alunos = new Map<string, AlunoEntity>();
}

// Esse é o nosso adapter para persitencia em memória, aqui vamos implementar a lógica de persistência bem parecida
// com o que vocês fizeram em outras aulas. Vamos conectar tudo depois voltamos aqui para implementar o resto.
