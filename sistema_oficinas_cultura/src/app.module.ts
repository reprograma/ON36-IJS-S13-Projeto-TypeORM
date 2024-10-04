import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoreModule } from './aluno/core/core.module';
import { ApplicationBootstrapOptions } from './aluno/common/interfaces/application-bootstrap-options.interface';
import { AlunoModule } from './aluno/application/aluno.module';
import { AlunoInfrastructureModule } from './aluno/infrastructure/aluno-infrastructure.module';

@Module({
  imports: [CoreModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  static register(options: ApplicationBootstrapOptions) {
    return {
      module: AppModule,
      imports: [
        CoreModule.forRoot(options), // Aqui entram as opções de configuração do banco de dados
        AlunoModule.comInfraestrutura(
          AlunoInfrastructureModule.use(options.driver),
        ),
      ],
    };
  }
}
