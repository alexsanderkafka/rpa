import { Body, Get, JsonController, Post, Req, Res } from "routing-controllers";
import ClientDTO from "../dto/ClientDTO";
import ClientService from "../service/ClientService";

@JsonController('/client')
export default class ClientController{

    private clientService: ClientService = new ClientService();

    @Post()
    public async create(@Body({ required: true }) dto: ClientDTO, @Res() res: any, @Req() req: any){
        console.log(dto);

        const response = await this.clientService.create(dto);

        return res.status(201).send(response);   
    }
}