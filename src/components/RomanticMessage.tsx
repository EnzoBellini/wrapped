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
          <div className="absolute -left-16 -top-20 h-40 w-40 rounded-full bg-fuchsia-400/30 sm:-left-24 sm:-top-32 sm:h-72 sm:w-72 sm:blur-3xl" />
          <div className="absolute -right-16 -bottom-20 h-44 w-44 rounded-full bg-emerald-300/30 sm:-right-24 sm:-bottom-32 sm:h-80 sm:w-80 sm:blur-3xl" />
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
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.4,
                delay: 0.05 + idx * 0.05,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              className="min-w-0 break-words text-balance text-sm font-medium leading-relaxed text-white sm:text-base sm:text-lg md:text-xl"
            >
              {line}
            </motion.p>
          ))}
        </div>
      </div>
    </div>
  );
}


