import { Injectable } from '@nestjs/common';
import { AlunoRepository } from '../../../../application/ports/aluno.repository';
import { AlunoEntity } from '../entities/aluno.entity';
import { Aluno } from '../../../../domain/aluno';
import { AlunoMapper } from '../mappers/aluno.mapper';

@Injectable()
export class TypeOrmAlunoRepository implements AlunoRepository {
  private readonly alunos = new Map<string, AlunoEntity>();

  constructor(private readonly alunoMapper: AlunoMapper) {}

  async salvar(aluno: Aluno): Promise<Aluno> {
    const persistenceModel = await this.alunoMapper.paraPersistencia(aluno);
    this.alunos.set(persistenceModel.id, persistenceModel);
    const newEntity = this.alunos.get(persistenceModel.id);
    
    return this.alunoMapper.paraDominio(newEntity);
  }

  async listar(): Promise<Aluno[]> {
    const entities = Array.from(this.alunos.values());
    return Promise.all(entities.map((item) => this.alunoMapper.paraDominio(item)));
  }

  async buscarPorEmail(email: string): Promise<Aluno> {
    const entities = Array.from(this.alunos.values());
    const alunoEncontrado = entities.find((item) => item.email === email);
    if (!alunoEncontrado) return null;
    return this.alunoMapper.paraDominio(alunoEncontrado);
  }
}

// Esse é o nosso adapter para persitencia em memória, aqui vamos implementar a lógica de persistência bem parecida
// com o que vocês fizeram em outras aulas. Vamos conectar tudo depois voltamos aqui para implementar o resto.
