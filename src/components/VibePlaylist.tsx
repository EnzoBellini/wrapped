"use client";

import { motion } from "framer-motion";
import { vibeTracks } from "@/data/data";

const barHeights = [
  [40, 70, 55, 80, 45],
  [60, 45, 75, 50, 70],
  [50, 65, 40, 78, 55],
];

export function VibePlaylist() {
  return (
    <div className="mt-4 space-y-2 sm:mt-6 sm:space-y-3">
      {vibeTracks.map((track, idx) => {
        const heights = barHeights[idx % barHeights.length];

        return (
          <div
            key={track.id}
            className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/6 px-3 py-2 backdrop-blur-md sm:rounded-2xl sm:gap-4 sm:px-4 sm:py-3"
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-white">{track.title}</p>
                  <p className="truncate text-xs text-white/65">{track.artist}</p>
                </div>
                <span className="text-[11px] font-medium text-white/65">{track.duration}</span>
              </div>
              <div className="mt-3 flex items-end gap-1.5 h-10">
                {heights.map((h, barIdx) => (
                  <motion.div
                    key={barIdx}
                    initial={{ height: 6 }}
                    animate={{ height: [h * 0.5, h, h * 0.6, h * 0.9, h] }}
                    transition={{
                      duration: 2 + barIdx * 0.15,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="w-1.5 rounded-full bg-gradient-to-b from-lime-300 via-fuchsia-300 to-orange-300"
                  />
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}


