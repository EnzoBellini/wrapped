"use client";

import { motion } from "framer-motion";
import { romanticMessage } from "@/data/data";

export function RomanticMessage() {
  const hasImage = Boolean(romanticMessage.imageUrl);

  return (
    <div className="relative mt-4 overflow-hidden rounded-2xl border border-white/14 bg-white/6 p-4 backdrop-blur-xl sm:mt-6 sm:rounded-[26px] sm:p-6 md:p-8">
      {/* background (foto opcional ou shapes) */}
      {hasImage ? (
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${romanticMessage.imageUrl})` }}
          />
          <div className="absolute inset-0 bg-black/55 backdrop-blur-[18px]" />
        </div>
      ) : (
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -left-24 -top-32 h-72 w-72 rounded-full bg-fuchsia-400/35 blur-3xl" />
          <div className="absolute -right-24 -bottom-32 h-80 w-80 rounded-full bg-emerald-300/35 blur-3xl" />
          <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/60 to-black/80" />
        </div>
      )}

      <div className="relative">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-xs font-semibold tracking-[0.28em] text-white/65 sm:text-sm"
        >
          NÓS DOIS
        </motion.p>

        <div className="mt-4 space-y-2 sm:mt-5 sm:space-y-3">
          {romanticMessage.lines.map((line, idx) => (
            <motion.p
              key={idx}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.65,
                delay: 0.08 + idx * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="text-balance text-base font-medium leading-relaxed text-white sm:text-lg md:text-xl"
            >
              {line}
            </motion.p>
          ))}
        </div>
      </div>
    </div>
  );
}


