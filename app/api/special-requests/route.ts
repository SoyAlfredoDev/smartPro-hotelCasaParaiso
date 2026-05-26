import { prisma } from "@/lib/prisma";

const allowedEventTypes = new Set([
  "Eventos corporativos",
  "Celebraciones privadas",
  "Charlas y conferencias",
  "Premiaciones y galas",
  "Otros",
]);

function formatSpecialRequestNumber(requestSequence: number) {
  return `SE${String(requestSequence).padStart(6, "0")}`;
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function getTodayAtMidnight() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      applicantName,
      applicantEmail,
      applicantPhone,
      eventDate,
      eventType,
      details,
    } = body;

    if (
      !isNonEmptyString(applicantName) ||
      !isNonEmptyString(applicantEmail) ||
      !isNonEmptyString(applicantPhone) ||
      !isNonEmptyString(eventDate) ||
      !isNonEmptyString(eventType) ||
      !isNonEmptyString(details)
    ) {
      return Response.json(
        { error: "Todos los campos obligatorios deben estar completos." },
        { status: 400 },
      );
    }

    if (!allowedEventTypes.has(eventType)) {
      return Response.json(
        { error: "El tipo de evento seleccionado no es válido." },
        { status: 400 },
      );
    }

    const parsedEventDate = new Date(`${eventDate}T00:00:00.000Z`);
    if (Number.isNaN(parsedEventDate.getTime())) {
      return Response.json(
        { error: "La fecha del evento no es válida." },
        { status: 400 },
      );
    }

    if (parsedEventDate < getTodayAtMidnight()) {
      return Response.json(
        { error: "La fecha del evento no puede ser anterior a hoy." },
        { status: 400 },
      );
    }

    const specialRequest = await prisma.specialRequest.create({
      data: {
        applicantName: applicantName.trim(),
        applicantEmail: applicantEmail.trim(),
        applicantPhone: applicantPhone.trim(),
        eventDate: parsedEventDate,
        eventType: eventType.trim(),
        details: details.trim(),
      },
    });
    const requestNumber = formatSpecialRequestNumber(
      specialRequest.requestSequence,
    );

    return Response.json(
      {
        requestNumber,
        specialRequest: {
          ...specialRequest,
          requestNumber,
        },
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error creating special request:", error);
    return Response.json(
      { error: "Error al crear la solicitud especial" },
      { status: 500 },
    );
  }
}
