# Roteiro de implementação do sistema usando NestJS

### 1. Escolha da primeira feature
Selecionamos a funcionalidade `Cadastrar usuário` como a primeira feature a ser implementada (mais simples).

Essa funcionalidade está ligada as seguintes regras de negócio:
   - ⬜️ Pessoas a partir de 16 anos (professores e estudantes);
   - ⬜️ Eu não devo persistir informação de data de nascimento no meu sistema;
   - ⬜️ Não existe restrição para cadastro de pessoas de outras cidades, estados;
   - ⬜️ Não pode haver duplicação de registros de alunos, cursos e professores - identificador único;

> Foco na missão: percorrer o código até a camada de Repository.

### 2. Desenhamos as classes do sistema relacionadas
Optamos por simplificar o processo criando diretamente uma classe `Aluno` e deixamos a herança de `Pessoas` para um segundo momento.

Também analisamos que embora a classe `Aluno` proposta tenha uma propriedade `cursos`, essa lista está vazia no momento do Cadastro.

O sistema exige que cada usuário seja único, mas atualmente nenhuma informação garante essa unicidade, portanto adicionamos a propriedade `email` para que essa regra possa ser implementada.

Foi adicionada uma regra de só permitir o cadastro de pessoas com mais de 16 anos ou que completem 16 no ano corrente. Para isso adicionamos a propriedade `anoNascimento` para permitir avaliar essa regra.

Também decidimos iniciar a classe sem métodos e adicionarmos assim que a necessidade surgir.

Representação inicial da nossa classe:

<table border="1">
  <tr>
    <th>Aluno</th>
  </tr>
  <tr>
    <td>
    <p> - nome: string </p>
    <p> - endereco: string</p>
    <p> - telefone: string</p>
    <p> - email: string </p>
    <p> - cursos: string[ ] </p>
   </td>
  </tr>
</table>

### 3. Cria aplicação NestJS

Roda no terminal: 
```bash
nest new sistema_oficinas_cultura
``` 

### 4. Cria arquivos de rotas da API
Criamos um arquivo `requests.http` usando a extensão REST Client (identificador VSCode - humao.rest-client).

Essa extensão permite rodar as chamadas no próprio VSCode e deixar as rotas documentadas num arquivo que pode ser compartilhado (isso vale para nosso caso que não tem informações sensíveis)

Assim podemos rodar a aplicação:

```bash
npm run start
``` 
> ⚠️ NOTA DA PROFA: Você não é obrigada a nada, pode usar a ferramenta que preferir para testar as rotas (Postman, Insomniam, Bruno...ou um curl roots tb vale). 

### 5. Altera script para rodar em modo dev
Para rodar em modo de desenvolvimento basta rodar:
```bash
npm run start:dev
``` 
Para deixar o comando mais curto alteramos a definição do script no `package.json` assim o comando fica:
```bash
npm run dev
``` 
*Nota: Posso fazer isso se já não existir um script com mesma chave*

### 6. Gera um CRUD para aluno no sistema
Falamos sobre alguns comandos que a CLI do NestJS disponibiza para nós.

Para ver os comandos disponíveis via CLI:
```bash
nest --help 
```
Para saber que arquivos o comando gera, mas não gerá-los (preview):
```bash
nest generate resource aluno --dry-run
```
Esse útimo comando gera toda uma estrutura de arquivos que nos permite implementar as principais camadas dentro do NestJS. 
Agora é só tirar o `--dry-run` e rodar novamente para ele criar todos os arquivos para gente. Ele pergunta qual a camada de transporte que queremos usar - `REST API`, ele também nos dá a opção de gerar os entry points do nosso CRUD, nós não recusamos CRUD gratuito então selecionamo `Y` para dizer sim.
`
Essa ação instala a dependencia `@nestjs/mapped-types` e já atualiza o package.json e o package-lock.json. Também cria os seguintes aquivos e pastas dentro da pasta  `/src`:

```
🗂 /aluno
   🗂 /dto
       create-aluno.dto.ts
       update-aluno.dto.ts
   🗂 /entities
       aluno.entity.ts
   aluno.controller.spec.ts
   aluno.controller.ts
   aluno.module.ts
   aluno.service.spec.ts
   aluno.service.ts

```
Com isso o NestJS entende que você criou um novo módulo para sua aplicação. Pra garantir que tudo continue funcionando ele "automagicamente" atualiza o `app.module.ts` para que a aplicação importe esse módulo e consiga utilizá-lo de modo correto.

> ⚠️ NOTA DA PROFA: Alterei o nome do recurso de alunos para alunos porque comecei a achar tudo no pural um pouco estranho. Ah! Lembre de atualizar o nome do recurso naquele decorator usado na classe AlunoController, lembra? Agora é `@Controler('alunos')`!

### 7. Atualiza arquivos de teste manual de rotas
Adiciona o POST de alunos no `requests.http`

Aqui vale você aproveitar que todas rotas estão de pé e olhar como você faz um GET, PUT, PATCH e DELETE na aplicação.

### 8. Deixa apenas a camada controller com teste e2e
> ⚠️ NOTA DA PROFA: Etapa adicionada após a aula. Para fins didáticos apaguei todos os arquivos não relacionados a camada controller e deixei apenas a rota de criação do aluno. Foco no cadastro de aluno!

Também apaguei o `update-aluno.dto.ts`, porque atualizar aluno não está no escopo do sistema (👋🏾 tchau código morto).

Ah! Mas e o serviço? A gente vai precisar dele 😢. Tem coisa que a gente só dá valor quando perde. Apaguei pra entendermos o que quebra sem ele. Isso é um ótimo teste pra você entender as dependencias entre as camadas do sistema (quem chama quem?).Ficou assim:

```
🗂 /aluno
   🗂 /dto
       create-aluno.dto.ts
   🗂 /entities
       aluno.entity.ts
   aluno.controller.spec.ts
   aluno.controller.ts
   aluno.module.ts
```

Antes de commitar...ih, mas será que removendo esses arquivos o sistema vai continuar funcionando? Rodei um `npm run test` e quebrou!!! 

Faltou remover os imports e uso de AlunoService de todos os cantos (módulo, testes, controller), não temos mais uma camada de serviço. Tudo tava tão amarradinho pelo NestJS que a gente nem percebeu. E a ausência dela nos ajuda a entender onde a camada de serviço toda. Feito!

Aproveitei pra mudar o nome do método do controller de `create` para `cadastrar`. Como não temos uma instancia do Service para usar, cabe ao controller chorar e agora quando ele é chamado retorna a mensagem "Não sei cadastrar um aluno, eu sou só um controller..." 

Rodada de teste...
- Testes unitários...check!
- Teste manual REST Client...check! 
- Teste e-2-e ? `npm run test:e2e`. Passou também ? Não comemore ainda. Fiz um monte de alteração, adicionei um novo controller, deletei arquivo e nada quebrou ? Deixa eu dar uma olhadinha nesse teste e2e.

O meu feeling tava certo, test e2e não tá testando a rota `POST /alunos` Vamos adicionar esse teste para garantir que o nosso commit garanta que tudo está DE FATO verde. E meu sistema tenha o mínimo para detectar qualquer problema que deixe essa nova rota indisponível. 

Assim nós adotamos uma boa prática para Integração contínua:
> *Sempre entregue código com os testes passando.* 

E não vale ser esse falso positivo como nós observamos aqui. Os testes são uma ferramenta que nos geram confiança para mudar e seguir com tudo funcionando.

Tenta fazer aí...copia o teste existente no arquivo `/test/app.e2e-spec.ts` e adiciona a rota /alunos pra ver o que acontece. Não tenha pressa...deixa o teste te guiar.

### 9. Define criarAlunoDTO
DTO, ou Data Transfer Object, é um padrão de design utilizado para transferir dados entre diferentes camadas de uma aplicação. No contexto do NestJS, os DTOs desempenham um papel crucial na organização e validação de dados que trafegam entre o cliente e o servidor.

No nosso caso definimos um criarAlunoDto e definimos as suas propriedades.

```javascript
class CreateAlunoDto {
  nome: string;
  endereco: string;
  email: string;
  telefone: string;
  anoNascimento: number;
}
```

### 10. Cria camada de servico e conecta ao controller
Rodamos o comando :
```bash
nest generate service Aluno
```

Para a classe de serviço ser reconhecida e usada pelo controller ela precisar:
1. adicionar no construtor do controller
2. adicionar como um provider no módulo de alunos

A camada de serviço é responsável por aplicar as regras de negócio e enviar os dados para a camada de persitência. Criamos um método `cadastrar` nela dada a sua responsabilidade de avisar para o controller caso alguma regra de negócio não esteja sendo atendida.

O meu método cadastrar aluno recebe um createAlunoDto e deve implementar uma verificação do atendimento as regras, mas antes disso ele precisa definir as propriedades deste DTO.

Adotamos o princípio do `early return` para verificação das regras de negócio, deste modo quando eu executar o método e algo falhar ele já lança a exception para ser capturada pelo controller e apresentada no payload.

> ⚠️ NOTA DA PROFA: Na aula exploramos a ideia de validar uma determinada restrição utilizando ValidationPipe, contudo, sabemos que é mais difíciel gerenciar e dar manutenção em sistemas que possuem as regras de negócio espalhadas. Vamos continuar usando o recurso do ValidationPipe, mas também vamos deixar a camada de serviço resguardando e garantindo que essa regra está devidamente implementada e testada.


### 11.Adiciona validacao de dados
O ValidationPipe é um recurso do NestJS que facilita a validação e transformação de dados recebidos em requisições HTTP. Ele utiliza as bibliotecas `class-validator` e `class-transformer` para garantir que os dados estejam em conformidade com as regras definidas nos DTOs (Data Transfer Objects). Para utilizar esse recurso vamos instalar esses pacotes: 

```bash
npm i class-validator class-transformer 
```
Depois disso adicionamos as regras de validação em cada campo para garantir que o createAlunoDto tenha o formato dos dados adequado. Quando um cliente enviar dados para a aplicação, o ValidationPipe verifica se esses dados atendem às regras de validação especificadas nas classes DTO. Por exemplo, se um DTO exige que um campo seja uma string não vazia ou um número inteiro, o ValidationPipe irá validar esses requisitos automaticamente.

Além da validação, o ValidationPipe também pode transformar os dados. Por exemplo, se um parâmetro de consulta (query parameter) é enviado como uma string, mas deve ser tratado como um número, o ValidationPipe pode convertê-lo automaticamente, desde que a configuração transform esteja habilitada.

Para ativar o ValidationPipe globalmente vamos ao arquivo `main.ts`e adicionamos essa configuração no nosso app, logo apó a sua criação:

```javascript
// ...
app.useGlobalPipes(
new ValidationPipe({
    forbidNonWhitelisted: true, // Retorna 404 se o payload não atender as regras do DTO
    whitelist: true, // Remove campos que não estão no DTO
    transform: true, // Transforma os campos para o tipo especificado no DTO
})
// ...
  );
  ```

Note que adicionamos algumas opções no nosso ValidationPipe. Vale a pena você testar cada uma dessas opções para entender o efeito de cada uma no seu código.

Você tem a opção de restringir a validação a partes de sua aplicação, não precisa ser uma definição global.

### 12. Define entidade Aluno
A princípio, pensamos na entidade Aluno como uma representação mais genérica, sem nos preocuparmos muito com a representação desta entidade como uma tabela de banco de dados. 

Na hora que precisamos implementar a camada de Repository precisamos virar essa chave e tratar a entidade como um elemento que precisa ser persistido, pois no contexto de uma aplicação NestJS, uma entidade é uma classe que representa uma tabela no banco de dados. 

Em aplicações simples como esta a representação da entidade como uma classe que representa um elemento do mundo real fica muito próxima da classe que será persistida na tabela, porém, em contextos mais complexos você pode ter definições diferentes. A grande sacada é tentar pensar em uma entidade como uma tabela na hora que você precisar persistir. 

Uma classe que representa um Aluno não precisa de um id, mas no momento que você olha pra essa classe com a responsabilidade de persistir ela no banco essa necessidade surge. Entendem a diferença ? A entidade a ser persistida no banco muda por necessidades da ferramenta de persistência, já classe que representa o domínio muda por necessidades de negócio.


### 12. Cria camada de repository
Criamos uma classe AlunoRepository com uma propriedade privada que representa uma lista de Alunos. A ideia aqui é fazer essa camada atuar como um banco de dados em memória. 

Criamos essa classe garantindo a adição do decorator @Injectable e a importamos no controller do nosso Service.

Para que os testes funcionem é necessário fazer a importação nos devidos módulos.

Também precisamos inserir um id único para cada aluno. Para isso utilizamos o pacote uuid. 

```bash
npm install uuidv4 
```
Adicionamos no repositórios os métodos de salvar e listar alunos. Com isso temos o módulo Alunos funcionando de ponta a ponta. Na próxima aula vamos colocar esse módulo para funcionar dentro dos princípios da arquitetura hexagonal.