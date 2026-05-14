import { motion, Variants } from "framer-motion";
import { Sparkles } from "lucide-react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const headerVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function HeaderSections({
  badge,
  title1,
  title2,
  description,
  buttonLabel,
  link,
  isBgDark = false,
}: {
  badge: string;
  title1: string;
  title2?: string;
  description: string;
  buttonLabel?: string;
  link?: string;
  isBgDark?: boolean;
}) {
  return (
    <>
      {/* Header – elegant white on dark green */}
      <motion.div
        variants={headerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, margin: "-80px" }}
        className="mb-16 flex flex-col gap-6 lg:mb-20 lg:flex-row lg:items-end lg:justify-between"
      >
        <div className="max-w-2xl">
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 rounded-full border border-[#c8a97e]/20 bg-[#c8a97e]/10 px-4 py-1.5 font-inter text-[11px] font-bold uppercase tracking-[0.2em] text-[#c8a97e]"
          >
            <Sparkles className="h-3.5 w-3.5" />
            {badge}
          </motion.span>

          <h2
            className={`mt-5 font-chillax text-4xl font-bold tracking-tight ${isBgDark ? "text-white" : "text-primary"} sm:text-5xl lg:text-[3.5rem]`}
          >
            {title1}{" "}
            <span className="bg-gradient-to-r from-[#c8a97e] to-[#d4bb96] bg-clip-text text-transparent">
              {title2}
            </span>
          </h2>

          <p
            className={`mt-5 max-w-xl font-inter text-[15px] leading-[1.8] ${isBgDark ? "text-white/60" : "text-primary/60"}`}
          >
            {description}
          </p>
        </div>

        {link ? (
          <Link
            href={link || "#"}
            className="btn-accent group/btn flex items-center gap-2 self-start rounded-xl px-7 py-3.5 font-inter text-[13px] lg:self-auto"
          >
            {buttonLabel || ""}
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
          </Link>
        ) : null}
      </motion.div>
    </>
  );
}
