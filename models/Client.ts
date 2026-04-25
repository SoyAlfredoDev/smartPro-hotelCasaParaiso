import { Reservation } from "./Reservation";

export class Client {
  name: string;
  email: string;
  phone: string;
  documentType: string;
  documentNumber: string;
  reservation: Array<Reservation>;

  constructor(
    name: string,
    email: string,
    phone: string,
    documentType: string,
    documentNumber: string,
  ) {
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.documentType = documentType;
    this.documentNumber = documentNumber;
    this.reservation = [];
  }
}
