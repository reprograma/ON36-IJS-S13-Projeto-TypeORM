import { DataSource, DataSourceOptions } from "typeorm";
import { AlunoEntity } from "./entities/aluno.entity";
import 'dotenv/config';
import { CursoEntity } from "./entities/curso.entity";

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: +process.env.DB_PORT || 5432,
  username: process.env.DB_USERNAME || 'nestuser',
  password: String(process.env.DB_PASSWORD) || 'senha123',
  database: process.env.DB_NAME || 'postgres',
  logging: true,
  migrations: [`${__dirname}/migrations/*.{ts,js}`],
  entities: [AlunoEntity, CursoEntity]
};

export default new DataSource(dataSourceOptions);
