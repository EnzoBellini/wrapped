"use client";

import { motion, type Variants } from "framer-motion";
import { stats } from "@/data/data";

export function StatsGrid() {
  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
  };

  const card: Variants = {
    hidden: { opacity: 0, y: 12 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] },
    },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="mt-4 grid min-w-0 gap-3 sm:mt-6 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3"
    >
      {stats.map((s) => {
        const percent = Math.max(5, Math.min(100, Math.round((s.value / s.max) * 100)));

        return (
          <motion.div
            key={s.id}
            variants={card}
            className="flex min-w-0 flex-col overflow-hidden rounded-2xl border border-white/14 bg-white/8 p-3 backdrop-blur-md sm:rounded-3xl sm:p-4"
          >
            <div className="min-w-0 overflow-hidden text-[10px] font-semibold leading-snug tracking-[0.14em] text-white/65 sm:text-xs sm:tracking-[0.18em] [word-break:break-word]">
              {s.label.toUpperCase()}
            </div>
            <div className="mt-1.5 flex shrink-0 items-baseline gap-2 sm:mt-2">
              <span className="text-2xl font-semibold text-white sm:text-3xl md:text-4xl">
                {s.value.toLocaleString("pt-BR")}
              </span>
            </div>
            <div className="mt-2 h-1.5 shrink-0 overflow-hidden rounded-full bg-white/10 sm:mt-3">
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: `${percent}%` }}
                transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="h-full rounded-full bg-gradient-to-r from-lime-300 via-fuchsia-300 to-orange-300"
              />
            </div>
            <div className="mt-1.5 min-w-0 shrink-0 overflow-hidden text-[10px] text-white/65 sm:mt-2 sm:text-[11px] [word-break:break-word]">
              {percent}% do nosso limite simbólico ({s.max.toLocaleString("pt-BR")})
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}


