export class Reservation {
  id: string;
  checkIn: Date;
  checkOut: Date;
  numberPeople: number;
  roomType: string;
  totalPrice: number;

  constructor(
    id: string,
    checkIn: Date,
    checkOut: Date,
    numberPeople: number,
    roomType: string,
    totalPrice: number,
  ) {
    this.id = id;
    this.checkIn = checkIn;
    this.checkOut = checkOut;
    this.numberPeople = numberPeople;
    this.roomType = roomType;
    this.totalPrice = totalPrice;
  }
}
