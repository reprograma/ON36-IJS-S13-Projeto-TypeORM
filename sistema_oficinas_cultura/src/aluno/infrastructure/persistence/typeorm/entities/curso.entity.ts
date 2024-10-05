import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { AlunoEntity } from "./aluno.entity";

@Entity('cursos')
export class CursoEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToMany(() => AlunoEntity, (aluno) => aluno.cursos)
  alunos: AlunoEntity[];
}