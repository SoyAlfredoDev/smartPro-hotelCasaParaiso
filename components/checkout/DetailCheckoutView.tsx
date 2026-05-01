"use client";
import { useEffect, useState } from "react";
//Componentes
import RoomsSelected from "@/components/checkout/RoomsSelected";
import ResumeCheckoutView from "@/components/checkout/ResumeCheckoutView";
import FormCustomer from "@/components/checkout/FormCustomer";

export default function DetailCheckoutView() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-b-4 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="relative w-full flex flex-col lg:flex-row max-w-7xl mx-auto py-12 lg:py-30">
      <div className="w-full lg:w-[70%] px-4">
        <RoomsSelected />
        <div className="mt-8 w-full overflow-hidden rounded-2xl border border-default bg-surface shadow-soft">
          <FormCustomer />
        </div>
      </div>

      <div className="w-full lg:w-[30%] h-[100%] px-4 mt-8 lg:mt-0">
        <ResumeCheckoutView />
      </div>
    </div>
  );
}
