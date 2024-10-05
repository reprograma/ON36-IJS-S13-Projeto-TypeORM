import { Module } from '@nestjs/common';
import { AlunoRepository } from '../../../application/ports/aluno.repository';
import { TypeOrmAlunoRepository } from './repositories/aluno.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './typeOrm.config';
import { AlunoEntity } from './entities/aluno.entity';
import { CursoEntity } from './entities/curso.entity';
import { AlunoMapper } from './mappers/aluno.mapper';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    TypeOrmModule.forFeature([AlunoEntity, CursoEntity])
  ],
  providers: [
    {
      provide: AlunoRepository,
      useClass: TypeOrmAlunoRepository, // É aqui que nós vinculamos uma porta e a um adaptador (a ideia aqui é dizer para o NestJS usar o InMemoryAlunoRepository sempre que alguém pedir por um AlunoRepository - isso facilita muito a troca de adaptadores, vc não precisa mudar nada no resto do código, só aqui).
    },
    AlunoMapper,
  ],
  exports: [AlunoRepository, TypeOrmModule],
})
export class TypeOrmAlunoPersistenceModule {}
