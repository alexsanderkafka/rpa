import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Client from "./Client";

@Entity("invoice")
export default class Invoice{
    
    @PrimaryGeneratedColumn()
    public id?: string;

    @Column("varchar", { nullable: false})
    public amount: number;

    @Column("date", { nullable: false, name: "issue_date"})
    public issueDate: Date;

    @Column("varchar", { nullable: false })
    public status: 'PENDING' | 'PAID' | 'CANCELLED' | 'OVERDUE';

    @Column("date", { nullable: false, name: "payment_date"})
    public paymentDate?: Date;

    @Column("varchar", { nullable: false })
    public description?: string;

    @Column("varchar", { nullable: false, name: "payment_method"})
    public paymentMethod?: 'PIX' | 'BOLETO' | 'CREDIT_CARD' | 'TRANSFER';

    @Column("varchar", { nullable: false })
    public barcode?: string;

    @ManyToOne(() => Client, (client) => client.id)
    @JoinColumn({ name: "client_id" })
    public client: Client;

    constructor(
        amount: number,
        issueDate: Date,
        status: 'PENDING' | 'PAID' | 'CANCELLED' | 'OVERDUE',
        client: Client,
        paymentDate?: Date | undefined,
        description?: string | undefined,
        paymentMethod?: 'PIX' | 'BOLETO' | 'CREDIT_CARD' | 'TRANSFER',
        barcode?: string | undefined
    ){
        this.amount = amount;
        this.issueDate = issueDate;
        this.status = status;
        this.paymentDate = paymentDate;
        this.description = description;
        this.paymentMethod = paymentMethod;
        this.barcode = barcode;
        this.client = client;    
    }
}