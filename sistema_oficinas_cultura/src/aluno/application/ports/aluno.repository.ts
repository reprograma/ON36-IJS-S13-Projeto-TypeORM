import { Aluno } from '../../domain/aluno';

export abstract class AlunoRepository {
  abstract salvar(aluno: Aluno): Promise<Aluno>;
  abstract listar(): Promise<Aluno[]>;
  abstract buscarPorEmail(email: string): Promise<Aluno>;
}

// Isso é uma porta, ou seja, uma interface que define um contrato que deve ser implementado
// por um adaptador para que seja possível acessar a camada de dados.

//Note que tanto a classe quanto os métodos são abstratos, ou seja, não possuem implementação.
//Isso é intencional, pois a implementação será feita por um adaptador que irá acessar a camada de dados.

// Aqui nós poderíamos ter usado uma interface, em vez de uma classe abstrata.
// Mas o motivo de usarmos uma classe abastrata é que elas servem com tokens de injeção de dependência no NestJS,
// enquanto interfaces são puramente construtores Typescript que são removidos durante o processo de transpilação
// (não estão disponíveis em tempo de execução), por isso a escolha de uma classe abstrata.
