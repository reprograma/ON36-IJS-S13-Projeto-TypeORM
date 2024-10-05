import { Curso } from "./curso";

export class Aluno {
  constructor(
    public id: string,
    public nome: string,
    public endereco: string,
    public email: string,
    public telefone: string,
    public cursos: Curso[], // Depois podemos converter para um array de objetos Curso
  ) {}
}
