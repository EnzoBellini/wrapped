"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useCallback, useMemo, useState } from "react";

type RangeKey = "low" | "midLow" | "mid" | "midHigh" | "high";

const IMAGE_BY_RANGE: Record<RangeKey, string> = {
  low: "/review/low.png",
  midLow: "/review/midLow.png",
  mid: "/review/mid.png",
  midHigh: "/review/midHigh.png",
  high: "/review/high.png",
};

/** Emojis que aparecem em volta da foto, conforme a faixa */
const EMOJIS_AROUND_IMAGE: Record<RangeKey, string[]> = {
  low: ["😤", "😠", "😢", "😭", "😞", "😣"],
  midLow: ["😕", "😐", "😑", "😒"],
  mid: ["🙂", "😊", "😌"],
  midHigh: ["😊", "🥰", "😍", "💕"],
  high: ["😍", "❤️", "🥰", "💕", "💖", "✨", "🌟"],
};

function getRange(value: number): RangeKey {
  if (value <= 20) return "low";
  if (value <= 40) return "midLow";
  if (value <= 60) return "mid";
  if (value <= 80) return "midHigh";
  return "high";
}

function getLabel(value: number): string {
  if (value <= 20) return "Odiei e eu te odeio";
  if (value <= 40) return "Eu só te odeio mesmo";
  if (value <= 60) return "Éééé....";
  if (value <= 80) return "Foi um ano bom!";
  return "ANO ÍNCRIVEL EU TE AMOOOO! ❤️ (foi a minha escolha mas sem pressão)";
}

export function YearReview() {
  const [value, setValue] = useState(80);

  const range = useMemo(() => getRange(value), [value]);
  const label = useMemo(() => getLabel(value), [value]);
  const imageSrc = useMemo(() => IMAGE_BY_RANGE[range], [range]);
  const aroundEmojis = useMemo(() => EMOJIS_AROUND_IMAGE[range], [range]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(Number(e.target.value));
  }, []);

  return (
    <div className="mt-4 flex min-w-0 max-w-full flex-col items-center gap-6 sm:mt-6 sm:gap-8">
      <p className="text-center text-sm text-white/75 sm:text-base">
        Arraste e veja como você avaliaria esse ano juntos. Pense bem na nota...
      </p>

      <div className="w-full min-w-0 max-w-md px-1">
        <div className="flex items-center justify-between gap-2 text-[10px] text-white/50 sm:text-xs">
          <span>0</span>
          <span className="text-lg font-semibold text-white sm:text-xl">{value}</span>
          <span>100</span>
        </div>
        <input
          type="range"
          min={0}
          max={100}
          value={value}
          onChange={handleChange}
          className="mt-1 h-3 w-full cursor-pointer appearance-none rounded-full bg-white/15 accent-fuchsia-400 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:cursor-grab [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gradient-to-r [&::-webkit-slider-thumb]:from-fuchsia-400 [&::-webkit-slider-thumb]:to-orange-400 [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:active:cursor-grabbing"
        />
      </div>

      <motion.p
        key={label}
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center text-base font-medium text-white sm:text-lg"
      >
        {label}
      </motion.p>

      {/* Foto central (sem moldura) */}
      <motion.div
        key={range}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.35 }}
        className="relative h-40 w-40 shrink-0 sm:h-48 sm:w-48 md:h-56 md:w-56"
      >
        <Image
          src={imageSrc}
          alt=""
          fill
          sizes="(max-width: 640px) 160px, (max-width: 768px) 192px, 224px"
          className="object-contain object-center"
          unoptimized
        />
      </motion.div>

      {/* Emojis embaixo da foto */}
      <motion.div
        layout
        className="flex flex-wrap items-center justify-center gap-2 sm:gap-3"
      >
        {aroundEmojis.map((emoji, i) => (
          <motion.span
            key={`B-${emoji}-${i}`}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.04, duration: 0.2 }}
            className="text-lg sm:text-xl md:text-2xl"
          >
            {emoji}
          </motion.span>
        ))}
      </motion.div>
    </div>
  );
}
