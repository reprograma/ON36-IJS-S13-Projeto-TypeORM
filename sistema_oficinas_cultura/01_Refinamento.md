## Requisitos Funcionais
- [ ] Deve ser possível cadastrar um aluno;
- [ ] Deve ser possível cadastrar um professor;
- [ ] Deve ser possível se matrícular em cursos oferecidos;
- [ ] Deve ser possível criar um curso;
- [ ] Deve ser possível editar um curso;
- [ ] Deve ser possível listar os alunos matriculados em um determinado curso;
- [ ] Deve ser possível registrar a presença dos alunos nas aulas do curso;

> Que ordem de entrega de funcionalidades, entrega mais valor para as pessoas que vão utilizar o nosso sistema ?


# Regras de negócios
- [ ] Pessoas a partir de 16 anos (professores e estudantes) 
- [ ] Eu não devo persistir informação de data de nascimento no meu sistema.
- [ ] Não existe restriçao para cadastro de pessoas de outras cidades, estados 
- [ ] Não pode haver duplicação de registros de alunos, cursos e professores - identificador único.
- [ ] Um estudante só pode se matricular em um curso disponível;
- [ ] Um aluno pode ser cadastrar em vários cursos, desde que o curso nao seja no mesmo dia;
- [ ] Um professor pode ministrar vários cursos, desde que o curso nao seja no mesmo dia;
- [ ] Um curso pode ter um ou mais professores associados.
- [ ] Uma pessoa pode ser aluna e professora
- [ ] Uma pessoa não pode ser aluna de uma turma em que é professora
- [ ] O numero maximo de estudantes por curso são 30 alunos
- [ ] O numero mínimo de estudantes por curso é 1
- [ ] A presença dos alunos deve ser registrada a cada aula.
- [ ] Um aluno pode ser marcado como presente ou ausente em cada aula.

> Faltou alguma regra ? 