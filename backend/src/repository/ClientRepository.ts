import { MysqlDataSource } from "../database";
import Client from "../entity/Client";

export default class ClientRepository{
    private orm: any = MysqlDataSource.getRepository(Client);

    public async saveClient(client: Client): Promise<Client> {
        return await this.orm.save(client);
    }
}