import { DataSource, DataSourceOptions } from "typeorm";
import { AlunoEntity } from "./entities/aluno.entity";
import 'dotenv/config';
import { CursoEntity } from "./entities/curso.entity";

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: String(process.env.DB_PASSWORD),
  database: process.env.DB_NAME,
  logging: true,
  migrations: [`${__dirname}/migrations/*.{ts,js}`],
  entities: [AlunoEntity, CursoEntity]
};

export default new DataSource(dataSourceOptions);