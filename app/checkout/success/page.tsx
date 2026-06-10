import { Suspense } from "react";
import SuccessPageClient from "@/components/checkout/SuccessPageClient";

export default function SuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <div className="h-10 w-10 animate-spin rounded-full border-b-4 border-primary" />
        </div>
      }
    >
      <SuccessPageClient />
    </Suspense>
  );
}
