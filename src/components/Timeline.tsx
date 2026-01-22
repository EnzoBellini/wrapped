"use client";

import { motion, type Variants } from "framer-motion";
import { relationshipStart } from "@/data/data";

export function Timeline() {
  const container: Variants = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.12, delayChildren: 0.05 },
    },
  };

  const easeOut: [number, number, number, number] = [0.16, 1, 0.3, 1];

  const item: Variants = {
    hidden: { opacity: 0, y: 14, filter: "blur(6px)" },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.5, ease: easeOut },
    },
  };

  return (
    <motion.ol
      variants={container}
      initial="hidden"
      animate="show"
      className="mt-4 space-y-2 sm:mt-6 sm:space-y-3"
    >
      {relationshipStart.milestones.map((m, i) => (
        <motion.li
          key={m.id}
          variants={item}
          className="relative rounded-xl border border-white/12 bg-white/6 px-4 py-3 backdrop-blur-md sm:rounded-2xl sm:px-5 sm:py-4"
        >
          <div className="flex items-start gap-4">
            <div className="mt-1 grid h-7 w-7 place-items-center rounded-full border border-white/14 bg-white/8 text-xs font-semibold text-white/80">
              {i + 1}
            </div>
            <div className="min-w-0">
              <div className="text-sm font-semibold text-white">{m.label}</div>
              <div className="mt-1 text-sm text-white/70">{m.detail}</div>
            </div>
          </div>
        </motion.li>
      ))}
    </motion.ol>
  );
}


