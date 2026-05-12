import NavBar from "@/components/NavBar";

export default function CancelledPage() {
  return (
    <>
      <div>
        <NavBar />
        <div className="min-h-screen bg-gray-500 flex items-center justify-center px-4 shadow-lg">
          <div className="max-w-md w-full bg-white rounded-2xl shadow-sm border border-neutral-200 p-8 text-center">
            {/* Icon */}
            <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center rounded-full bg-red-50">
              <svg
                className="w-7 h-7 text-red-500"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>

            {/* Title */}
            <h1 className="text-xl font-semibold text-neutral-900 mb-2">
              Pago cancelado
            </h1>

            {/* Description */}
            <p className="text-sm text-neutral-500 mb-6">
              No se realizó ningún cargo. Puedes intentarlo nuevamente cuando
              quieras.
            </p>

            {/* Actions */}
            <div className="flex flex-col gap-3">
              <a
                href="/checkout"
                className="w-full bg-primary text-white text-sm font-medium py-2.5 rounded-lg hover:bg-neutral-800 transition"
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
      </div>
    </>
  );
}
