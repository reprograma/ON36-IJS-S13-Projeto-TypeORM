import { Body, Controller, Post, Get } from '@nestjs/common';
import { CreateAlunoDto } from './dto/create-aluno.dto';
import { AlunoService } from '../../application/aluno.service';
import { CreateAlunoCommand } from '../../application/commands/create-aluno-command';

@Controller('alunos')
export class AlunoController {
  constructor(private readonly alunoService: AlunoService) {}

  @Post()
  cadastrar(@Body() createAlunoDto: CreateAlunoDto) {
    return this.alunoService.cadastrar(
      new CreateAlunoCommand(
        createAlunoDto.nome,
        createAlunoDto.endereco,
        createAlunoDto.email,
        createAlunoDto.telefone,
        createAlunoDto.anoNascimento,
      ),
    );
  }

  @Get()
  listar() {
    return this.alunoService.listar();
  }
}
