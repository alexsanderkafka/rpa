import 'dotenv/config';
import { DataSource } from 'typeorm';
import Client from './entity/Client';
import { CreateClient1745243699735 } from './migration/1745243699735-CreateClient';
import { CreateInvoce1745244640227 } from './migration/1745244640227-CreateInvoce';
import Invoice from './entity/Invoice';

export const MysqlDataSource = new DataSource({
    type: 'mysql',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '3306'),
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || 'root',
    database: process.env.DB_NAME || 'teste',
    entities: [Client, Invoice],
    synchronize: true,
    logging: true,
    //migrations: [CreateClient1745243699735, CreateInvoce1745244640227]
});