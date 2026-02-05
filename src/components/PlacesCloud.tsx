"use client";

import { motion, type Variants } from "framer-motion";
import { places } from "@/data/data";

export function PlacesCloud() {
  const main = places.slice(0, 4);
  const tags = places;

  const grid: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
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
    <div className="mt-4 space-y-4 sm:mt-6 sm:space-y-6">
      <motion.div
        variants={grid}
        initial="hidden"
        animate="show"
        className="grid gap-4 sm:grid-cols-2"
      >
        {main.map((p) => (
          <motion.div
            key={p.id}
            variants={card}
            className="rounded-2xl border border-white/14 bg-white/8 px-4 py-3 shadow-[0_16px_60px_-32px_rgba(0,0,0,0.7)] backdrop-blur-md sm:rounded-3xl sm:px-5 sm:py-4"
          >
            <div className="min-w-0 break-words text-base font-semibold text-white sm:text-lg">{p.name}</div>
            <div className="mt-1 min-w-0 break-words text-xs text-white/65 sm:text-sm">Sempre rende boas memórias.</div>
          </motion.div>
        ))}
      </motion.div>

      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-3 backdrop-blur-md sm:rounded-3xl sm:p-4">
        <div className="text-[10px] font-semibold tracking-[0.22em] text-white/60 sm:text-xs">
          TAG CLOUD
        </div>
        <div className="mt-2 flex flex-wrap gap-1.5 sm:mt-3 sm:gap-2">
          {tags.map((p) => (
            <span
              key={p.id}
              className="rounded-full border border-white/18 bg-white/8 px-2.5 py-1 text-[11px] font-medium text-white/80 backdrop-blur sm:px-3 sm:text-xs"
            >
              {p.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}


