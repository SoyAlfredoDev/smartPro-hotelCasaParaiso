import { z } from "zod";

export const validateBookingSearchSchema = z.object({
  lastName: z
    .string()
    .trim()
    .min(2, "Ingresa tu apellido (mínimo 2 caracteres).")
    .max(80, "El apellido es demasiado largo.")
    .regex(
      /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s'-]+$/,
      "El apellido solo puede contener letras.",
    ),
  reservationNumber: z
    .string()
    .trim()
    .min(1, "Ingresa el número de reserva.")
    .regex(/^\d+$/, "El número de reserva solo debe contener dígitos."),
});

export type ValidateBookingSearchInput = z.infer<
  typeof validateBookingSearchSchema
>;
