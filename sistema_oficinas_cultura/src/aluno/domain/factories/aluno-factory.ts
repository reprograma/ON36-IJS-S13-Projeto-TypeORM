import { Injectable } from '@nestjs/common';
import { uuid } from 'uuidv4';
import { Aluno } from '../aluno';
import { Curso } from '../curso';

@Injectable()
export class AlunoFactory {
  criar(nome: string, endereco: string, email: string, telefone: string, cursos: Curso[]) {
    const alunoId = uuid();

    return new Aluno(alunoId, nome, endereco, email, telefone, cursos);
  }
}
