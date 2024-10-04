export class AlunoEntity {
  id: string;
  nome: string;
  endereco: string;
  email: string;
  telefone: string;
  cursos: string[];
}

// Aqui no in-memory a entidade nao precisa de decoradores, pois nao estamos utilizando um banco de dados ainda.
// Mais adinte, você vai aprender como adicionar decoradores para ajudar o seu banco a indentificar os formatos dos
// campos da sua tabela
