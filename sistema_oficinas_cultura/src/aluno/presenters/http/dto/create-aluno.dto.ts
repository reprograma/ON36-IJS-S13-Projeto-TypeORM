import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreateAlunoDto {
  @IsString()
  nome: string;

  @IsString()
  endereco: string;

  @IsNotEmpty()
  email: string;

  @IsString()
  telefone: string;

  @IsNotEmpty()
  @IsPositive()
  @IsNumber()
  anoNascimento: number;

  @IsArray({ message: 'Cursos deve ser uma lista de array.' })
  cursos: string[];
}
