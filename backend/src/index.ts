import "dotenv/config";
import 'reflect-metadata';

import { MysqlDataSource } from "./database";
import { createExpressServer } from "routing-controllers";
import express from "express";
import bodyParser from "body-parser";

import ClientController from "./controller/ClientController";
import InvoiceController from "./controller/InvoiceController";


const app = createExpressServer({
    cors: true,
    controllers: [ClientController, InvoiceController],
    routePrefix: "/api",
    defaultErrorHandler: true
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//app.use(bodyParser.json());

const initializeDatabase = async () => {
    try{
        await MysqlDataSource.initialize();
        console.log("Data Source has been initialized!");
    }catch(err){
        console.log("Error during Data Source initialization: ", err);
        process.exit(1);
    }
}

initializeDatabase();

const PORT  = process.env.SERVER_PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});