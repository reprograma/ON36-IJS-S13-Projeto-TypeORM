import { Body, Controller, Post, Get } from '@nestjs/common';
import { CreateAlunoDto } from './dto/create-aluno.dto';
import { AlunoService } from '../../application/aluno.service';
import { CreateAlunoCommand } from '../../application/commands/create-aluno-command';

@Controller('alunos')
export class AlunoController {
  constructor(private readonly alunoService: AlunoService) { }

  @Post()
  async cadastrar(@Body() createAlunoDto: CreateAlunoDto) {
    const createAlunoCommand = new CreateAlunoCommand(
      createAlunoDto.nome,
      createAlunoDto.endereco,
      createAlunoDto.email,
      createAlunoDto.telefone,
      createAlunoDto.anoNascimento,
      createAlunoDto.cursos
    );

    return await this.alunoService.cadastrar(createAlunoCommand);
  }

  /* @Get()
  async listar() {
    return this.alunoService.listar();
  } */

  /* @Get(':email')
  async buscarPorEmail(@Param('email') email: string) {
    return await this.alunoService.buscarPorEmail(email)
  } */
}
