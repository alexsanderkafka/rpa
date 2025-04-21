import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateInvoce1745244640227 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE invoce (
                id BIGINT PRIMARY KEY,
                amount float NOT NULL,
                issue_date DATE NOT NULL,
                status VARCHAR NOT NULL,
                payment_date DATE,
                description VARCHAR,
                payment_method VARCHAR CHECK (payment_method IN ('PIX', 'BOLETO', 'CREDIT_CARD', 'TRANSFER')),
                barcode VARCHAR,
                client_id BIGINT NOT NULL,
                FOREIGN KEY (client_id) REFERENCES client(id)
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
