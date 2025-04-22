import RegisterDTO from "../dto/RegisterDTO";
import Client from "../entity/Client";
import Invoice from "../entity/Invoice";
import ClientRepository from "../repository/ClientRepository";
import InvoiceRepository from "../repository/InvoceRepository";

export default class ClientService{
    
    private clientRepository: ClientRepository = new ClientRepository();
    private invoiceRepository: InvoiceRepository = new InvoiceRepository();
    
    public async create(dto: RegisterDTO): Promise<void>{
        //se precisar verificar alguma coisa

        const newClient: Client = new Client(dto.name, dto.social, dto.agency, dto.accountNumber, dto.email, dto.phone);

        const currentClient: Client = await this.clientRepository.saveClient(newClient);

        const barcode: string = this.generateBarcode();
        const issueDate: Date = new Date();
        const description: string = `Pague o mais rápido`;
        const dueDate: Date = new Date(issueDate.getTime() + 7 * 24 * 60 * 60 * 1000); // 7 dias depois

        const currentInvoce: Invoice = new Invoice(dto.amount, issueDate, 'PENDING', currentClient, dueDate, description, 'BOLETO', barcode);

        await this.invoiceRepository.save(currentInvoce);
    }

    private generateBarcode(): string{
        let barcode = '';

        for (let i = 0; i < 47; i++) {
            barcode += Math.floor(Math.random() * 10);
        }

        return barcode;
    }
}