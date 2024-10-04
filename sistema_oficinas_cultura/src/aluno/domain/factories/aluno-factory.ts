import { Injectable } from '@nestjs/common';
import { uuid } from 'uuidv4';
import { Aluno } from '../aluno';

@Injectable()
export class AlunoFactory {
  criar(nome: string, endereco: string, email: string, telefone: string) {
    const alunoId = uuid();
    const alunoCurso = [];
    return new Aluno(alunoId, nome, endereco, email, telefone, alunoCurso);
  }
}
