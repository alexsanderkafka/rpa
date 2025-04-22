import { MysqlDataSource } from "../database";
import Invoice from "../entity/Invoice";

export default class InvoiceRepository {
    
    private orm: any = MysqlDataSource.getRepository(Invoice);

    public async save(invoice: Invoice): Promise<void> {
        await this.orm.save(invoice);
    }

    public async findAll(): Promise<Invoice[]> {
        return await this.orm.find(
            {
                relations: ['client'],
            }
        );
    }
}