import { MigrationInterface, QueryRunner } from "typeorm";

export class CriaTabelaAlunoCurso1728158944571 implements MigrationInterface {
    name = 'CriaTabelaAlunoCurso1728158944571'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "cursos" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, CONSTRAINT "PK_391c5a635ef6b4bd0a46cb75653" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "alunos" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nome" character varying NOT NULL, "endereco" character varying NOT NULL, "email" character varying NOT NULL, "telefone" character varying NOT NULL, CONSTRAINT "UQ_1f9a8f3f4e5a314a2d7f828a605" UNIQUE ("email"), CONSTRAINT "PK_0090f2d8573e71e8e4e274db905" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "alunos_cursos_cursos" ("alunosId" uuid NOT NULL, "cursosId" uuid NOT NULL, CONSTRAINT "PK_a4d8e632fbf97a8cc56d1c67d57" PRIMARY KEY ("alunosId", "cursosId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_dd1ef5edef1abcab754fb65015" ON "alunos_cursos_cursos" ("alunosId") `);
        await queryRunner.query(`CREATE INDEX "IDX_f791c323a2cbbf7abcdc724cc8" ON "alunos_cursos_cursos" ("cursosId") `);
        await queryRunner.query(`ALTER TABLE "alunos_cursos_cursos" ADD CONSTRAINT "FK_dd1ef5edef1abcab754fb65015c" FOREIGN KEY ("alunosId") REFERENCES "alunos"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "alunos_cursos_cursos" ADD CONSTRAINT "FK_f791c323a2cbbf7abcdc724cc89" FOREIGN KEY ("cursosId") REFERENCES "cursos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "alunos_cursos_cursos" DROP CONSTRAINT "FK_f791c323a2cbbf7abcdc724cc89"`);
        await queryRunner.query(`ALTER TABLE "alunos_cursos_cursos" DROP CONSTRAINT "FK_dd1ef5edef1abcab754fb65015c"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f791c323a2cbbf7abcdc724cc8"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_dd1ef5edef1abcab754fb65015"`);
        await queryRunner.query(`DROP TABLE "alunos_cursos_cursos"`);
        await queryRunner.query(`DROP TABLE "alunos"`);
        await queryRunner.query(`DROP TABLE "cursos"`);
    }

}
