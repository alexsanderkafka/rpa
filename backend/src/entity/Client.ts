import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("client")
export default class Client{
    
    @PrimaryGeneratedColumn()
    public id?: number;

    @Column("varchar", { nullable: false })
    public name: string;

    @Column("varchar", { nullable: false })
    public social: string;

    @Column("varchar", { nullable: false })
    public agency: string;

    @Column("varchar", { nullable: false })
    public accountNumber: string;

    @Column("varchar", { nullable: false })
    public email: string;

    @Column("varchar", { nullable: false })
    public phone: string;

    constructor(
        name: string,
        social: string,
        agency: string,
        accountNumber: string,
        email: string,
        phone: string
    ){
        this.name = name;
        this.social = social;
        this.agency = agency;
        this.accountNumber = accountNumber;
        this.email = email;
        this.phone = phone;
    }


}