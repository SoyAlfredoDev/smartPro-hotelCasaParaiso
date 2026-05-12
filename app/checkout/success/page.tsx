import NavBar from "@/components/NavBar";

export default function SuccessPage({
  searchParams,
}: {
  searchParams: { orden: string };
}) {
  const orderId = searchParams?.orden;

  return (
    <div className="min-h-screen bg-primary flex items-center justify-center px-4">
      <NavBar />
      <div className="max-w-md w-full bg-white rounded-2xl shadow-sm border border-neutral-200 p-8 text-center">
        {/* Icon */}
        <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center rounded-full bg-green-50">
          <svg
            className="w-7 h-7 text-green-600"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        {/* Title */}
        <h1 className="text-xl font-semibold text-neutral-900 mb-2">
          Pago exitoso
        </h1>

        {/* Description */}
        <p className="text-sm text-neutral-500 mb-4">
          Tu pago fue procesado correctamente. Gracias por tu compra.
        </p>

        {/* Order ID (opcional pero recomendable) */}
        {orderId && (
          <p className="text-xs text-neutral-400 mb-6">
            Número de orden: <span className="font-medium">{orderId}</span>
          </p>
        )}

        {/* Actions */}
        <div className="flex flex-col gap-3">
          <a
            href="/"
            className="w-full bg-primary text-white text-sm font-medium py-2.5 rounded-lg hover:bg-neutral-800 transition"
          >
            Volver al inicio
          </a>

          <a
            href="/mis-reservas"
            className="w-full text-sm text-neutral-600 hover:text-neutral-900 transition"
          >
            Ver mi reserva
          </a>
        </div>
      </div>
    </div>
  );
}
