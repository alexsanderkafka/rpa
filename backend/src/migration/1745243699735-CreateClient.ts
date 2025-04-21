import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateClient1745243699735 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE client (
              id BIGINT PRIMARY KEY,
              name VARCHAR NOT NULL,
              social VARCHAR NOT NULL,
              agency VARCHAR NOT NULL,
              account_number VARCHAR NOT NULL,
              email VARCHAR NOT NULL,
              phone VARCHAR NOT NULL
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
