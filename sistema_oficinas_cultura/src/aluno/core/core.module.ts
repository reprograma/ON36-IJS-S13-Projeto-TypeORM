// Esse arquivo foi gerado pelo comando nest g mo core.

import { DynamicModule, Module } from '@nestjs/common';
import { ApplicationBootstrapOptions } from '../common/interfaces/application-bootstrap-options.interface';
import { TypeOrmAlunoPersistenceModule } from '../infrastructure/persistence/typeorm/typeorm-persistence.module';

@Module({})
export class CoreModule {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static forRoot(options: ApplicationBootstrapOptions): DynamicModule {
    const imports = [];
    
    if (options.driver === 'typeorm') {
      imports.push(TypeOrmAlunoPersistenceModule)
    } else if (options.driver === 'in-memory') {
      throw new Error('Não foi implementado.')
    } else if (options.driver === 'in-file') {
      throw new Error('Não foi implementado.')
    }

    return {
      module: CoreModule,
      imports,
    };
  }
}

// Aqui é um boiler plate para você cnseguir inserir as configurações do banco na inicialização da aplicação.
// Agora não faz tanto sentido, mas quando você tiver que configurar o banco de dados, vai ser muito útil.
