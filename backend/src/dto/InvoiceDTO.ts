import Client from "../entity/Client";

export default class InvoiceDTO {
  public id?: number;
  public amount: number;
  public issueDate: Date;
  public status: string;
  public dueDate?: Date;
  public description?: string;
  public paymentMethod?: string;
  public barcode?: string;
  public client: Client;

  constructor(
    id: number | undefined,
    amount: number,
    issueDate: Date,
    status: string,
    dueDate: Date | undefined,
    description: string | undefined,
    paymentMethod: string | undefined,
    barcode: string | undefined,
    client: Client
  ) {
    this.id = id;
    this.amount = amount;
    this.issueDate = issueDate;
    this.status = status;
    this.dueDate = dueDate;
    this.description = description;
    this.paymentMethod = paymentMethod;
    this.barcode = barcode;
    this.client = client;
  }
}
