import { Module } from '@nestjs/common';
import { AlunoRepository } from '../../../application/ports/aluno.repository';
import { InMemoryAlunoRepository } from './repositories/aluno.repository';

@Module({
  imports: [],
  providers: [
    {
      provide: AlunoRepository,
      useClass: InMemoryAlunoRepository, // É aqui que nós vinculamos uma porta e a um adaptador (a ideia aqui é dizer para o NestJS usar o InMemoryAlunoRepository sempre que alguém pedir por um AlunoRepository - isso facilita muito a troca de adaptadores, vc não precisa mudar nada no resto do código, só aqui).
    },
  ],
  exports: [AlunoRepository],
})
export class InMemoryAlunoPersistenceModule {}
