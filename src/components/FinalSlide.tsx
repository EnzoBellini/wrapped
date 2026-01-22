"use client";

import { motion } from "framer-motion";
import { memo, useEffect, useState } from "react";
import { useAudio } from "@/contexts/AudioContext";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { ConfettiAnimation } from "./ConfettiAnimation";
import { Toast } from "./ui/Toast";

function FinalSlideComponent() {
  const [showToast, setShowToast] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const { playSound } = useAudio();

  useEffect(() => {
    setShowConfetti(true);
  }, []);

  const handleShare = async () => {
    if (typeof window === "undefined") return;
    
    try {
      const url = window.location.href;
      await navigator.clipboard.writeText(url);
      playSound("success");
      setShowToast(true);
    } catch (err) {
      // Fallback para navegadores que não suportam clipboard API
      if (typeof document === "undefined") return;
      
      const textArea = document.createElement("textarea");
      textArea.value = window.location.href;
      textArea.style.position = "fixed";
      textArea.style.opacity = "0";
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand("copy");
        playSound("success");
        setShowToast(true);
      } catch (fallbackErr) {
        console.error("Erro ao copiar link:", fallbackErr);
      }
      document.body.removeChild(textArea);
    }
  };

  return (
    <>
      {showConfetti && !prefersReducedMotion && <ConfettiAnimation duration={5000} />}
      
      <div className="flex flex-col items-center gap-6 text-center sm:gap-8 md:gap-10">
        <motion.div
          initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, ...(prefersReducedMotion ? {} : { scale: 1 }) }}
          transition={
            prefersReducedMotion
              ? { duration: 0.2 }
              : { duration: 0.8, ease: "easeOut" }
          }
          className="space-y-3 sm:space-y-4"
        >
          <h1 className="text-4xl font-semibold text-white sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
            Feliz 1 ano{" "}
            {!prefersReducedMotion && (
              <span className="inline-block animate-pulse">❤️</span>
            )}
            {prefersReducedMotion && <span>❤️</span>}
          </h1>
        </motion.div>

        <motion.div
          initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, ...(prefersReducedMotion ? {} : { y: 0 }) }}
          transition={
            prefersReducedMotion
              ? { duration: 0.2, delay: 0.1 }
              : { duration: 0.6, delay: 0.3, ease: "easeOut" }
          }
        >
          <button
            type="button"
            onClick={handleShare}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-black shadow-lg shadow-fuchsia-500/20 transition hover:scale-[1.02] hover:shadow-fuchsia-400/30 active:scale-[0.98] sm:h-14 sm:px-8 sm:text-base"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
              <polyline points="16 6 12 2 8 6" />
              <line x1="12" y1="2" x2="12" y2="15" />
            </svg>
            Compartilhar
          </button>
        </motion.div>
      </div>

      <Toast
        message="Link copiado para a área de transferência!"
        isVisible={showToast}
        onClose={() => setShowToast(false)}
      />
    </>
  );
}

export const FinalSlide = memo(FinalSlideComponent);
