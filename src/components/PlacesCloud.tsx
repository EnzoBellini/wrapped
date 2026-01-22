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
    hidden: { opacity: 0, y: 16, scale: 0.96, filter: "blur(6px)" },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: { type: "spring", stiffness: 420, damping: 30 },
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
            <div className="text-base font-semibold text-white sm:text-lg">{p.name}</div>
            <div className="mt-1 text-xs text-white/65 sm:text-sm">Sempre rende boas memórias.</div>
          </motion.div>
        ))}
      </motion.div>

      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-3 backdrop-blur-md sm:rounded-3xl sm:p-4">
        <div className="text-[10px] font-semibold tracking-[0.22em] text-white/60 sm:text-xs">
          TAG CLOUD
        </div>
        <div className="mt-2 flex flex-wrap gap-1.5 sm:mt-3 sm:gap-2">
          {tags.map((p, idx) => (
            <motion.span
              key={p.id}
              initial={{ opacity: 0, y: 6, scale: 0.95 }}
              animate={{
                opacity: 1,
                y: [0, -4, 0],
                x: [0, 3, 0],
                scale: 1,
              }}
              transition={{
                duration: 4 + idx * 0.2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: idx * 0.08,
              }}
              className="rounded-full border border-white/18 bg-white/8 px-3 py-1 text-xs font-medium text-white/80 backdrop-blur"
            >
              {p.name}
            </motion.span>
          ))}
        </div>
      </div>
    </div>
  );
}


