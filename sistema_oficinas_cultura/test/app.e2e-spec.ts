import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('deve retornar uma mensagem de health check quando a rota / for requisitada', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('deve retornar um aluno quando a rota /alunos for requisitada', () => {
    const requestBody = {
      nome: 'John',
      endereco: 'Doe',
      telefone: '123456789',
      email: 'jonh@doe.com',
      anoNascimento: 1990,
    };

    return request(app.getHttpServer())
      .post('/alunos')
      .send(requestBody)
      .expect(201)
      .expect((res) => {
        expect(res.body.id).toBeDefined();
        expect(res.body.nome).toBe(requestBody.nome);
        expect(res.body.endereco).toBe(requestBody.endereco);
        expect(res.body.telefone).toBe(requestBody.telefone);
        expect(res.body.email).toBe(requestBody.email);
        expect(res.body).not.toHaveProperty('anoNascimento');
        expect(res.body.cursos).toStrictEqual([]);
      });
  });
});
