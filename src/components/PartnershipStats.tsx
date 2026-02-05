"use client";

import { memo, useMemo } from "react";
import { motion, type Variants } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { partnershipStats } from "@/data/data";

type CircularGaugeProps = {
  label: string;
  value: number | string;
  unit: string;
  index: number;
};

const CircularGauge = memo(function CircularGauge({ label, value, unit, index }: CircularGaugeProps) {
  const prefersReducedMotion = useReducedMotion();
  const size = 100;
  const strokeWidth = 8;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  
  // Para valores numéricos, calcular a porcentagem
  // Para "alta", usar 85% como representação visual
  const percent = typeof value === "number" ? value : 85;
  const offset = circumference - (percent / 100) * circumference;

  const gradientId = `gradient-${index}`;

  const card: Variants = useMemo(
    () => ({
      hidden: prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 12 },
      show: {
        opacity: 1,
        ...(prefersReducedMotion ? {} : { y: 0 }),
        transition: prefersReducedMotion
          ? { duration: 0.2, delay: index * 0.05 }
          : { duration: 0.35, delay: index * 0.08, ease: [0.25, 0.1, 0.25, 1] },
      },
    }),
    [index, prefersReducedMotion],
  );

  const pathVariants: Variants = useMemo(
    () => ({
      hidden: { pathLength: 0 },
      show: {
        pathLength: percent / 100,
        transition: prefersReducedMotion
          ? { duration: 0.2, delay: index * 0.05 + 0.1 }
          : { duration: 0.6, delay: index * 0.08 + 0.15, ease: [0.25, 0.1, 0.25, 1] },
      },
    }),
    [index, percent, prefersReducedMotion],
  );

  return (
    <motion.div
      variants={card}
      initial="hidden"
      animate="show"
      className="flex flex-col items-center rounded-2xl border border-white/14 bg-white/8 p-3 backdrop-blur-md sm:rounded-3xl sm:p-4 md:p-6"
    >
      <div className="relative" style={{ width: size, height: size, minWidth: size, minHeight: size }}>
        <svg width={size} height={size} className="transform -rotate-90">
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#a3e635" stopOpacity="1" />
              <stop offset="50%" stopColor="#ec4899" stopOpacity="1" />
              <stop offset="100%" stopColor="#fb923c" stopOpacity="1" />
            </linearGradient>
          </defs>
          
          {/* Círculo de fundo */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="rgba(255, 255, 255, 0.1)"
            strokeWidth={strokeWidth}
          />
          
          {/* Círculo animado */}
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={`url(#${gradientId})`}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            variants={pathVariants}
            initial="hidden"
            animate="show"
            style={{
              filter: "drop-shadow(0 0 8px rgba(236, 72, 153, 0.5))",
            }}
          />
        </svg>
        
        {/* Valor central */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-semibold text-white sm:text-3xl md:text-4xl">
              {typeof value === "number" ? value : "Alta"}
            </span>
            {unit && (
              <span className="text-sm font-medium text-white/70 sm:text-base md:text-lg">{unit}</span>
            )}
          </div>
        </div>
      </div>
      
      {/* Label */}
      <div className="mt-3 text-center min-w-0 sm:mt-4">
        <div className="break-words text-[10px] font-semibold tracking-[0.14em] text-white/65 uppercase sm:text-xs sm:tracking-[0.18em]">
          {label}
        </div>
      </div>
    </motion.div>
  );
});

function PartnershipStatsComponent() {
  const prefersReducedMotion = useReducedMotion();
  
  const container: Variants = useMemo(
    () => ({
      hidden: {},
      show: {
        transition: prefersReducedMotion
          ? { staggerChildren: 0.05, delayChildren: 0.05 }
          : {
              staggerChildren: 0.1,
              delayChildren: 0.1,
            },
      },
    }),
    [prefersReducedMotion],
  );

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="mt-4 grid gap-3 sm:mt-6 sm:grid-cols-3 sm:gap-4"
    >
      {partnershipStats.map((stat, index) => (
        <CircularGauge
          key={stat.id}
          label={stat.label}
          value={stat.value}
          unit={stat.unit}
          index={index}
        />
      ))}
    </motion.div>
  );
}

export const PartnershipStats = memo(PartnershipStatsComponent);
