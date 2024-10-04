import {
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
  @IsEmail()
  email: string;

  @IsString()
  telefone: string;

  @IsNotEmpty()
  @IsPositive()
  @IsNumber()
  anoNascimento: number;
}
