import { motion } from "framer-motion";
import { CreditCard, ShieldCheck } from "lucide-react";

export default function ButtonToPay() {
  return (
    <>
      <motion.button className="btn-primary flex w-full items-center justify-center gap-2 py-4 text-base shadow-glow-primary">
        <CreditCard className="h-5 w-5" />
        Pagar con Transbank
      </motion.button>

      <div className="mt-5 flex items-center justify-center gap-2 text-xs font-medium text-text-secondary">
        <ShieldCheck className="h-4 w-4 text-green-600" />
        <span>Pago 100% seguro y encriptado</span>
      </div>
    </>
  );
}
