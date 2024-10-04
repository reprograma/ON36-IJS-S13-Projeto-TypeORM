import { Module, Type, DynamicModule } from '@nestjs/common';
import { AlunoController } from '../presenters/http/aluno.controller';
import { AlunoService } from './aluno.service';
import { AlunoFactory } from '../domain/factories/aluno-factory';

@Module({
  controllers: [AlunoController],
  providers: [AlunoService, AlunoFactory],
})
export class AlunoModule {
  // Aqui criamos um método estático que nos permite escolher qual módulo de persistência queremos usar.
  static comInfraestrutura(infrastructureModule: Type | DynamicModule) {
    return {
      module: AlunoModule,
      imports: [infrastructureModule], //Essa linha é onde ocorre a injeção do módulo de persistência.
    };
  }
}

// Aqui estamos usando o padrão de composição de módulos do NestJS. Que permite que os consumidores do módulo
// escolham qual módulo de persistência querem usar. Isso é um padrão muito poderoso, que nos permite desacoplar
// a infraestrutura da camada da aplicação.
