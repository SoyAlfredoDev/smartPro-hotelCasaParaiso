import NavBar from "@/components/NavBar";

export default function ErrorPage() {
  return (
    <div className="min-h-screen  bg-gray-500 flex items-center justify-center px-4">
      <NavBar />
      <div className="max-w-md w-full bg-white rounded-2xl shadow-sm border border-neutral-200 p-8 text-center">
        {/* Icon */}
        <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center rounded-full bg-yellow-50">
          <svg
            className="w-7 h-7 text-yellow-600"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v2m0 4h.01M12 3l9 16H3l9-16z"
            />
          </svg>
        </div>

        {/* Title */}
        <h1 className="text-xl font-semibold text-neutral-900 mb-2">
          Ocurrió un problema
        </h1>

        {/* Description */}
        <p className="text-sm text-neutral-500 mb-6">
          No pudimos procesar tu pago en este momento. Puede ser un error
          temporal. Intenta nuevamente en unos minutos.
        </p>

        {/* Actions */}
        <div className="flex flex-col gap-3">
          <a
            href="/checkout"
            className="w-full bg-neutral-900 text-white text-sm font-medium py-2.5 rounded-lg hover:bg-neutral-800 transition"
          >
            Intentar nuevamente
          </a>

          <a
            href="/"
            className="w-full text-sm text-neutral-600 hover:text-neutral-900 transition"
          >
            Volver al inicio
          </a>
        </div>
      </div>
    </div>
  );
}
