"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import { useAudio } from "@/contexts/AudioContext";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useSlideNavigation } from "./SlideNavigationContext";

function ThankYouSlideComponent() {
  const { goTo } = useSlideNavigation();
  const prefersReducedMotion = useReducedMotion();
  const { playSound } = useAudio();

  return (
    <div className="flex flex-col items-center gap-5 text-center sm:gap-6 md:gap-8">
      <motion.div
        initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, ...(prefersReducedMotion ? {} : { y: 0 }) }}
        transition={
          prefersReducedMotion
            ? { duration: 0.2 }
            : { duration: 0.6, ease: "easeOut" }
        }
        className="space-y-3 sm:space-y-4"
      >
        <h2 className="text-2xl font-semibold text-white sm:text-3xl md:text-4xl lg:text-5xl">
          Obrigada(o) por esse ano incrível
        </h2>
        <p className="text-base text-white/80 sm:text-lg md:text-xl lg:text-2xl">
          Bora viver o próximo capítulo?
        </p>
      </motion.div>

      <motion.div
        initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, ...(prefersReducedMotion ? {} : { y: 0 }) }}
        transition={
          prefersReducedMotion
            ? { duration: 0.2, delay: 0.1 }
            : { duration: 0.6, delay: 0.2, ease: "easeOut" }
        }
      >
        <button
          type="button"
          onClick={() => {
            playSound("click");
            goTo(0);
          }}
          className="inline-flex h-12 items-center justify-center rounded-full bg-white px-6 text-sm font-semibold text-black shadow-lg shadow-fuchsia-500/20 transition hover:scale-[1.02] hover:shadow-fuchsia-400/30 active:scale-[0.98] sm:h-14 sm:px-8 sm:text-base"
        >
          Rever do começo
        </button>
      </motion.div>
    </div>
  );
}

export const ThankYouSlide = memo(ThankYouSlideComponent);
