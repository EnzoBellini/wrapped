"use client";

import { motion, type Variants } from "framer-motion";
import { stats } from "@/data/data";

export function StatsGrid() {
  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.09, delayChildren: 0.08 } },
  };

  const card: Variants = {
    hidden: { opacity: 0, y: 16, scale: 0.96, filter: "blur(6px)" },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: { type: "spring", stiffness: 400, damping: 30 },
    },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="mt-4 grid gap-3 sm:mt-6 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3"
    >
      {stats.map((s) => {
        const percent = Math.max(5, Math.min(100, Math.round((s.value / s.max) * 100)));

        return (
          <motion.div
            key={s.id}
            variants={card}
            className="flex flex-col rounded-2xl border border-white/14 bg-white/8 p-3 backdrop-blur-md sm:rounded-3xl sm:p-4"
          >
            <div className="text-[10px] font-semibold tracking-[0.18em] text-white/65 sm:text-xs">
              {s.label.toUpperCase()}
            </div>
            <div className="mt-1.5 flex items-baseline gap-2 sm:mt-2">
              <span className="text-2xl font-semibold text-white sm:text-3xl md:text-4xl">
                {s.value.toLocaleString("pt-BR")}
              </span>
            </div>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10 sm:mt-3">
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: `${percent}%` }}
                transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="h-full rounded-full bg-gradient-to-r from-lime-300 via-fuchsia-300 to-orange-300"
              />
            </div>
            <div className="mt-1.5 text-[10px] text-white/65 sm:mt-2 sm:text-[11px]">
              {percent}% do nosso limite simbólico ({s.max.toLocaleString("pt-BR")})
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}


