import { Get, JsonController, Res, Req } from "routing-controllers";
import InvoiceDTO from "../dto/InvoiceDTO";
import InvoiceService from "../service/InvoiceService";

@JsonController('/invoice')
export default class InvoiceController{

    private invoiceService: InvoiceService = new InvoiceService();

    @Get()
    public async findAllInvoices( @Res() res: any, @Req() req: any): Promise<InvoiceDTO[]>{

        const response = await this.invoiceService.findAll();

        return res.status(200).send(response);   
    }
}