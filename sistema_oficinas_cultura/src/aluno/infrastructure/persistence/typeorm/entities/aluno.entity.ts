import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { CursoEntity } from "./curso.entity";

@Entity('alunos')
export class AlunoEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @IsString({ message: 'nome deve ser uma string.' })
  @IsNotEmpty()
  @Column()
  nome: string;

  @IsString({ message: 'nome deve ser uma string.' })
  @IsNotEmpty()
  @Column()
  endereco: string;

  @IsEmail()
  @Column({ unique: true })
  email: string;

  @Column()
  telefone: string;

  @ManyToMany(() => CursoEntity, (curso) => curso.alunos, { cascade: true })
  @JoinTable()
  cursos: CursoEntity[];
}

// Aqui no in-memory a entidade nao precisa de decoradores, pois nao estamos utilizando um banco de dados ainda.
// Mais adinte, você vai aprender como adicionar decoradores para ajudar o seu banco a indentificar os formatos dos
// campos da sua tabela
