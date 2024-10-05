import { Injectable } from '@nestjs/common';
import { Aluno } from '../../../../domain/aluno';
import { AlunoEntity } from '../entities/aluno.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CursoEntity } from '../entities/curso.entity';
import { Repository } from 'typeorm';
import { Curso } from 'src/aluno/domain/curso';

@Injectable()
export class AlunoMapper {
  constructor(
    @InjectRepository(CursoEntity)
    private readonly cursoRepository: Repository<CursoEntity>
  ) {}

  paraDominio(alunoEntity: AlunoEntity): Aluno {
    const cursos = alunoEntity.cursos.map(
      (cursoEntity) => new Curso(cursoEntity.id, cursoEntity.name)
    )

    return new Aluno(
      alunoEntity.id,
      alunoEntity.nome,
      alunoEntity.endereco,
      alunoEntity.email,
      alunoEntity.telefone,
      cursos,
    );
  }

  async paraPersistencia(aluno: Aluno): Promise<AlunoEntity> {
    const entity = new AlunoEntity();
    entity.id = aluno.id;
    entity.nome = aluno.nome;
    entity.endereco = aluno.endereco;
    entity.email = aluno.email;
    entity.telefone = aluno.telefone;

    if (aluno.cursos && aluno.cursos.length > 0) {
      entity.cursos = aluno.cursos.map((curso) => {
        const cursoEntity = new CursoEntity();
        cursoEntity.id = curso.id;
        cursoEntity.name = curso.name;

        return cursoEntity;
      }) 
    } else {
      entity.cursos = [];
    }

    return entity;
  }
}

// Aqui não temos nenhuma dependencia externa, poderíamos extrair esse arquivo para uma pasta compartilhada entre os adaptadores.
// Neste cenário atual não é necessário, mas adaptadores mais sofisticados podem ser diferentes, então é bom manter isso em mente.
// Para evitar problemas vamos manter ele aqui por enquanto (eu darei um desconto pra vcs se justificarem essa repetição de código, fora isso não aceito)