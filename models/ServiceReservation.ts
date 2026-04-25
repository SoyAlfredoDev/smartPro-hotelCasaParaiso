import { Client } from "./Client";
import { Reservation } from "./Reservation";

export class ServiceReservation {
  createReservation(
    client: Client,
    reservation: Reservation,
    dataReservation: any,
  ) {
    try {
      if (!client) {
        throw new Error("Cliente es requerido");
      }
      if (!reservation) {
        throw new Error("Reserva es requerida");
      }
      if (!dataReservation) {
        throw new Error("Datos de la reserva son requeridos");
      }
    } catch (error) {
      console.log(error);
    }
  }

  updateReservation() {}

  deleteReservation() {}

  getReservation() {}

  getReservations() {}
}
