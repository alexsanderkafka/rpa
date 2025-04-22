import { Body, Get, JsonController, Post, Req, Res } from "routing-controllers";
import ClientService from "../service/ClientService";
import RegisterDTO from "../dto/RegisterDTO";

@JsonController('/client')
export default class ClientController{

    private clientService: ClientService = new ClientService();

    @Post()
    public async create(@Body({ required: true }) dto: RegisterDTO, @Res() res: any, @Req() req: any){
        console.log(dto);

        const response = await this.clientService.create(dto);

        return res.status(201).send();   
    }

    
}