import { Suspense } from "react";
import ErrorPageClient from "@/components/checkout/ErrorPageClient";

export default function ErrorPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <div className="h-10 w-10 animate-spin rounded-full border-b-4 border-primary" />
        </div>
      }
    >
      <ErrorPageClient />
    </Suspense>
  );
}
