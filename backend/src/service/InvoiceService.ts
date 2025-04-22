import InvoiceDTO from "../dto/InvoiceDTO";
import Invoice from "../entity/Invoice";
import InvoiceRepository from "../repository/InvoceRepository";

export default class InvoiceService{

    private invoiceRepository: InvoiceRepository = new InvoiceRepository();

    public async findAll(): Promise<InvoiceDTO[]> {
        const invoices: Invoice[] = await this.invoiceRepository.findAll();

        const invoicesDTO: InvoiceDTO[] = invoices.map((invoice: Invoice) => {
            return new InvoiceDTO(
                invoice.id,
                invoice.amount,
                invoice.issueDate,
                invoice.status,
                invoice.dueDate,
                invoice.description,
                invoice.paymentMethod,
                invoice.barcode,
                invoice.client
            );
        });

        return invoicesDTO
    }
}