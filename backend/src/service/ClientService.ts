import ClientDTO from "../dto/ClientDTO";
import Client from "../entity/Client";
import ClientRepository from "../repository/ClientRepository";

export default class ClientService{
    
    private clientRepository: ClientRepository = new ClientRepository();
    
    public async create(dto: ClientDTO): Promise<ClientDTO>{
        //se precisar verificar alguma coisa

        const currentClient: ClientDTO = {
            name: dto.name,
            social: dto.social,
            agency: dto.agency,
            accountNumber: dto.accountNumber,
            email: dto.email,
            phone: dto.phone
        };

        return this.clientRepository.saveClient(currentClient);
    }
}