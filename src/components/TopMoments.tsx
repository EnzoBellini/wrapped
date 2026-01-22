"use client";

import { motion, type Variants } from "framer-motion";
import { top3Moments } from "@/data/data";

export function TopMoments() {
  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.12 } },
  };

  const card: Variants = {
    hidden: { opacity: 0, y: 18, scale: 0.96, filter: "blur(7px)" },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: { type: "spring", stiffness: 420, damping: 28 },
    },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="mt-4 grid gap-3 sm:mt-6 sm:gap-4 md:grid-cols-3"
    >
      {top3Moments.map((m) => (
        <motion.div
          key={m.id}
          variants={card}
          className="rounded-2xl border border-white/12 bg-white/7 p-4 shadow-[0_16px_60px_-28px_rgba(0,0,0,0.8)] backdrop-blur-md sm:rounded-3xl sm:p-5"
        >
          <div className="text-2xl sm:text-3xl">{m.emoji}</div>
          <div className="mt-2 text-base font-semibold text-white sm:mt-3 sm:text-lg">{m.title}</div>
          <div className="mt-1.5 text-xs leading-relaxed text-white/70 sm:mt-2 sm:text-sm">{m.blurb}</div>
        </motion.div>
      ))}
    </motion.div>
  );
}


