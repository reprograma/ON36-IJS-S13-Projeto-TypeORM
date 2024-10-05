import { Aluno } from '../../../../domain/aluno';
import { AlunoEntity } from '../entities/aluno.entity';

export class AlunoMapper {
  static paraDominio(alunoEntity: AlunoEntity): Aluno {
    const model = new Aluno(
      alunoEntity.id,
      alunoEntity.nome,
      alunoEntity.endereco,
      alunoEntity.email,
      alunoEntity.telefone,
      alunoEntity.cursos,
    );
    return model;
  }

  static paraPersistencia(aluno: Aluno) {
    const entity = new AlunoEntity();
    entity.id = aluno.id;
    entity.nome = aluno.nome;
    entity.endereco = aluno.endereco;
    entity.email = aluno.email;
    entity.telefone = aluno.telefone;
    entity.cursos = aluno.cursos;
    return entity;
  }
}

// Aqui não temos nenhuma dependencia externa, poderíamos extrair esse arquivo para uma pasta compartilhada entre os adaptadores.
// Neste cenário atual não é necessário, mas adaptadores mais sofisticados podem ser diferentes, então é bom manter isso em mente.
// Para evitar problemas vamos manter ele aqui por enquanto (eu darei um desconto pra vcs se justificarem essa repetição de código, fora isso não aceito).
