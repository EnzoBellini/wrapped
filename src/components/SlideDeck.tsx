"use client";

import { AnimatePresence, motion } from "framer-motion";
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useAudio } from "@/contexts/AudioContext";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { SlideShell } from "./SlideShell";
import { slides } from "./slides";
import { BigNumber } from "./ui/BigNumber";
import { SlideNavigationProvider } from "./SlideNavigationContext";

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function SlideDeckComponent() {
  const total = slides.length;
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const prefersReducedMotion = useReducedMotion();
  const { playSound } = useAudio();

  const lastScrollTimeRef = useRef(0);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const touchDeltaRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  const goTo = useCallback(
    (nextIndex: number) => {
      setIndex((curr) => {
        const clamped = clamp(nextIndex, 0, total - 1);
        if (clamped === curr) return curr;
        setDirection(clamped > curr ? 1 : -1);
        playSound("slide");
        return clamped;
      });
    },
    [total, playSound],
  );

  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);

  // Keyboard navigation (desativada no slide do review para não atrapalhar o slider)
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (slides[index].id === "review") return;
      const key = e.key.toLowerCase();
      if (key === "arrowright" || key === "d") next();
      if (key === "arrowleft" || key === "a") prev();
      if (key === "home") goTo(0);
      if (key === "end") goTo(total - 1);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [goTo, next, prev, total, index]);

  // Mouse wheel with debounce (desativado no slide do review para não atrapalhar o slider)
  useEffect(() => {
    function onWheel(e: WheelEvent) {
      if (slides[index].id === "review") return;
      e.preventDefault(); // Prevenir scroll padrão
      const now = performance.now();
      if (now - lastScrollTimeRef.current < 500) return;

      // Apenas navegar se o scroll for significativo e vertical
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX) && Math.abs(e.deltaY) > 50) {
        if (e.deltaY > 50) {
          lastScrollTimeRef.current = now;
          next();
        } else if (e.deltaY < -50) {
          lastScrollTimeRef.current = now;
          prev();
        }
      }
    }

    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, [next, prev, index]);

  // Touch swipe
  function handleTouchStart(e: React.TouchEvent<HTMLElement>) {
    const touch = e.touches[0];
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
    touchDeltaRef.current = { x: 0, y: 0 };
  }

  function handleTouchMove(e: React.TouchEvent<HTMLElement>) {
    if (!touchStartRef.current) return;
    const touch = e.touches[0];
    touchDeltaRef.current = {
      x: touch.clientX - touchStartRef.current.x,
      y: touch.clientY - touchStartRef.current.y,
    };
  }

  function handleTouchEnd() {
    if (slides[index].id === "review") {
      touchStartRef.current = null;
      touchDeltaRef.current = { x: 0, y: 0 };
      return;
    }
    const { x, y } = touchDeltaRef.current;
    const absX = Math.abs(x);
    const absY = Math.abs(y);

    if (absX > 40 && absX > absY) {
      if (x < 0) next();
      else prev();
    }

    touchStartRef.current = null;
    touchDeltaRef.current = { x: 0, y: 0 };
  }

  const progress = useMemo(() => (index + 1) / total, [index, total]);

  /* Animações leves (sem blur/scale) para fluidez no celular */
  const variants = useMemo(
    () => ({
      enter: (dir: 1 | -1) =>
        prefersReducedMotion
          ? { opacity: 0 }
          : { opacity: 0, y: dir === 1 ? 16 : -16 },
      center: {
        opacity: 1,
        ...(prefersReducedMotion ? {} : { y: 0 }),
      },
      exit: (dir: 1 | -1) =>
        prefersReducedMotion
          ? { opacity: 0 }
          : { opacity: 0, y: dir === 1 ? -16 : 16 },
    }),
    [prefersReducedMotion],
  );

  const currentSlide = slides[index];

  return (
    <SlideNavigationProvider goTo={goTo}>
      <section
        className="relative h-dvh w-full min-w-0 overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="pointer-events-none fixed inset-x-0 top-0 z-10 h-1 bg-white/10">
          <div
            className="h-full bg-white/70 transition-all duration-300"
            style={{ width: `${Math.round(progress * 100)}%` }}
          />
        </div>

        <div className="flex h-full items-center justify-center overflow-x-hidden px-4 py-6 pr-14 min-w-0 sm:px-5 sm:py-8 sm:pr-16 md:px-10 md:py-10 md:pr-20">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentSlide.id}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={
                prefersReducedMotion
                  ? { duration: 0.2 }
                  : { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }
              }
              className="w-full min-w-0 max-w-full"
            >
              <SlideShell
                kicker={currentSlide.kicker}
                title={currentSlide.id === "intro" ? undefined : currentSlide.title}
                body={currentSlide.id === "intro" ? undefined : currentSlide.body}
                accent={currentSlide.accent}
                badges={currentSlide.badges}
                header={
                  currentSlide.id === "intro" ? (
                    <div className="relative overflow-hidden">
                      <motion.h1
                        initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
                        animate={{ opacity: 1, ...(prefersReducedMotion ? {} : { y: 0 }) }}
                        transition={
                          prefersReducedMotion
                            ? { duration: 0.2 }
                            : { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }
                        }
                        className="min-w-0 break-words text-balance text-2xl font-semibold leading-[1.08] tracking-tight text-white sm:text-4xl sm:text-5xl md:text-6xl lg:text-7xl"
                      >
                        Nossa retrospectiva de 1 ano
                      </motion.h1>
                      <motion.p
                        initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 8 }}
                        animate={{ opacity: 1, ...(prefersReducedMotion ? {} : { y: 0 }) }}
                        transition={
                          prefersReducedMotion
                            ? { duration: 0.2, delay: 0.05 }
                            : { duration: 0.35, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }
                        }
                        className="mt-2 min-w-0 break-words text-sm font-medium text-white/80 sm:mt-4 sm:text-base sm:text-lg md:text-xl"
                      >
                        Enzo e Milena
                      </motion.p>
                    </div>
                  ) : undefined
                }
              >
                {currentSlide.id === "intro" ? (
                  <div className="mt-8 flex flex-wrap items-center gap-3 sm:mt-10">
                    <button
                      type="button"
                      onClick={() => {
                        playSound("click");
                        next();
                      }}
                      className="inline-flex h-11 items-center justify-center rounded-full bg-white px-5 text-sm font-semibold text-black shadow-lg shadow-fuchsia-500/20 transition hover:scale-[1.02] hover:shadow-fuchsia-400/30 active:scale-[0.98] sm:h-12 sm:px-6"
                    >
                      Começar
                    </button>
                    <div className="text-xs text-white/70 sm:text-sm">Swipe ou seta →</div>
                  </div>
                ) : (
                  <>
                    {currentSlide.bigNumber ? (
                      <BigNumber value={currentSlide.bigNumber.value} suffix={currentSlide.bigNumber.suffix} />
                    ) : null}

                    {currentSlide.render ? <div className="mt-4 sm:mt-6">{currentSlide.render()}</div> : null}

                    <div className="mt-4 flex flex-wrap items-center justify-center gap-2 sm:mt-6 sm:gap-3 sm:justify-start">
                      <button
                        type="button"
                        onClick={() => {
                          playSound("click");
                          prev();
                        }}
                        disabled={index === 0}
                        className="inline-flex h-10 items-center justify-center rounded-full border border-white/18 bg-white/10 px-4 text-xs font-medium text-white/85 transition enabled:hover:bg-white/14 disabled:opacity-40 sm:h-11 sm:px-5 sm:text-sm"
                      >
                        ← Anterior
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          playSound("click");
                          next();
                        }}
                        disabled={index === total - 1}
                        className="inline-flex h-10 items-center justify-center rounded-full border border-white/18 bg-white/10 px-4 text-xs font-medium text-white/85 transition enabled:hover:bg-white/14 disabled:opacity-40 sm:h-11 sm:px-5 sm:text-sm"
                      >
                        Próximo →
                      </button>

                      <div className="hidden text-[10px] text-white/55 sm:block sm:text-xs">
                        Swipe / ← →
                      </div>
                    </div>
                  </>
                )}
              </SlideShell>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Indicador inferior (ex: 3/10) - safe area iPhone */}
        <div className="pointer-events-none fixed z-20 px-4 sm:px-6 md:px-10" style={{ bottom: 'max(1rem, env(safe-area-inset-bottom, 1rem))', left: 'env(safe-area-inset-left, 0)', right: 'env(safe-area-inset-right, 0)' }}>
          <div className="mx-auto flex w-full max-w-5xl items-center justify-end">
            <span className="rounded-full border border-white/14 bg-white/8 px-2.5 py-1 text-[10px] font-semibold tracking-[0.18em] text-white/70 backdrop-blur-md sm:px-3 sm:text-[11px] sm:tracking-[0.22em]">
              {index + 1}/{total}
            </span>
          </div>
        </div>
      </section>
    </SlideNavigationProvider>
  );
}

export const SlideDeck = memo(SlideDeckComponent);


