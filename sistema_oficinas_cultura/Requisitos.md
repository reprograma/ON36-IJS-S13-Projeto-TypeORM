# Refinamento

> The hardest single part of building a software system is deciding precisely what to build. – Frederick Brooks


### Requisitos funcionais
Requisitos funcionais são especificações que definem `o que um sistema deve fazer`. Eles descrevem as funcionalidades e comportamentos que o sistema deve apresentar, como tarefas, serviços ou comportamentos que o usuário espera. Exemplos incluem o cadastro de usuários, a geração de relatórios ou a realização de cálculos.

Exemplos:
- Exibir cursos com matrículas disponíveis
- Criar matrícula em um curso
- Editar matrícula em um curso
- Avaliar matrícula solicitada em um curso

> Dicas: 
>    - Capacidade de fazer alguma coisa - algo que o software deve executar
>    - Verbo no infinitivo (buscar, definir, recuperar)
>    - 5W1H - o que?, por por que ? por quem ? quando ? onde ? (como?) -> envolve levantar restrições(Regras de Negócio)

---

### Requisitos Não Funcionais
Requisitos não funcionais são especificações que definem `como um sistema deve operar`, em vez de o que deve fazer. Eles abordam aspectos como desempenho, segurança, usabilidade, escalabilidade, manutenibilidade e confiabilidade do sistema. Esses requisitos são importantes para garantir que o sistema atenda às expectativas do usuário em termos de qualidade.

Exemplos:
- O sistema deve ser implementado em Typescript
- O sistema deve disponibilizar uma API Rest
- O sistema deve persistir em um banco de dados PostegreSQL
- O sistema deve garantir disponibilidade em 99% do tempo
- Tempo de resposta deve ser de no máximo 2s

> Dica: o software deve apresentar uma característica que não é uma funcionalidade.

---

### Regras de Negócio
Regras de negócio são `diretrizes ou condições que definem ou restringem comportamentos, decisões ou ações` dentro de um sistema. Elas refletem as políticas e procedimentos da organização que deve ser seguida durante o funcionamento do sistema. As regras de negócio garantem que o sistema funcione de acordo com as necessidades e objetivos da organização.

Exemplos: (Avaliar matrícula solicitada em uma turma)
- A aluna deve atender os pré-requisitos exigidos para o curso (publico alvo: endereço. faixa etária, curso anterior, grau de instrução, identidade de genero, faixa socioeconomica).
- Uma aluna só pode fazer 1 matrícula por curso;
- Uma aluna não pode se matricular simultaneamente em 2 cursos;
- Uma aluna não pode se matricular em um curso em que ela atua como professora;
- Caso os pedidos de matrícula superem as vagas ofertadas a turma será formada pelas alunas que fizerem matrícula seguindo a ordem de solicitação;
- Caso duas alunas tenham feito matrícula no mesmo dia e horário, a aluna mais velha tem prioridade.

> Dicas:
> - Não é um requisito de software;
> - Não depende de desenvolvimento, ela existe no domínio (tendo um software ou não ela continua existindo)
> - Afeta os requisitos funcionais;

---

### Casos de Uso
Casos de uso são descrições de `como um usuário interage com um sistema para alcançar um objetivo` específico. Cada caso de uso inclui um ator (usuário ou sistema externo), uma sequência de ações ou interações e o resultado esperado. Os casos de uso ajudam a entender os requisitos funcionais do sistema e a mapear as interações do usuário com o sistema.

Exemplos: 
- Dado que eu sou um Administrador
- Quando eu requisita o endpoint de cadastro de aluno e o sistema 
- É esperado que o sistema registre o aluno.

> Dica: 
> - Conceito do mundo de desenvolvimento (UML) - é uma funcionalidade
> - Cada caso de uso deve se referir a pelo menos 1 requisito funcional
