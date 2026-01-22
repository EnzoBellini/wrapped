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

  // Keyboard navigation
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      const key = e.key.toLowerCase();
      if (key === "arrowright" || key === "d") next();
      if (key === "arrowleft" || key === "a") prev();
      if (key === "home") goTo(0);
      if (key === "end") goTo(total - 1);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [goTo, next, prev, total]);

  // Mouse wheel with debounce - apenas para navegação entre slides
  useEffect(() => {
    function onWheel(e: WheelEvent) {
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
  }, [next, prev]);

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

  const variants = useMemo(
    () => ({
      enter: (dir: 1 | -1) =>
        prefersReducedMotion
          ? { opacity: 0 }
          : {
              opacity: 0,
              y: dir === 1 ? 28 : -28,
              scale: 0.985,
              filter: "blur(7px)",
            },
      center: {
        opacity: 1,
        ...(prefersReducedMotion ? {} : { y: 0, scale: 1, filter: "blur(0px)" }),
      },
      exit: (dir: 1 | -1) =>
        prefersReducedMotion
          ? { opacity: 0 }
          : {
              opacity: 0,
              y: dir === 1 ? -24 : 24,
              scale: 0.985,
              filter: "blur(7px)",
            },
    }),
    [prefersReducedMotion],
  );

  const currentSlide = slides[index];

  return (
    <SlideNavigationProvider goTo={goTo}>
      <section
        className="relative h-dvh w-full overflow-hidden"
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

        <div className="flex h-full items-center justify-center px-4 py-6 sm:px-5 sm:py-8 md:px-10 md:py-10">
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
                  : { type: "spring", stiffness: 240, damping: 28 }
              }
              className="w-full"
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
                      {!prefersReducedMotion && (
                        <motion.div
                          className="absolute -left-10 -top-10 h-48 w-48 rounded-full bg-white/8 blur-2xl sm:h-64 sm:w-64"
                          animate={{ x: [0, 20, -10, 0], y: [0, -10, 15, 0], rotate: [0, 10, -5, 0] }}
                          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
                        />
                      )}
                      <motion.h1
                        initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 30 }}
                        animate={{ opacity: 1, ...(prefersReducedMotion ? {} : { y: 0 }) }}
                        transition={
                          prefersReducedMotion
                            ? { duration: 0.2 }
                            : { duration: 0.7, ease: "easeOut" }
                        }
                        className="text-balance text-3xl font-semibold leading-[1.02] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
                      >
                        Nossa retrospectiva de 1 ano
                      </motion.h1>
                      <motion.p
                        initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 24 }}
                        animate={{ opacity: 1, ...(prefersReducedMotion ? {} : { y: 0 }) }}
                        transition={
                          prefersReducedMotion
                            ? { duration: 0.2, delay: 0.05 }
                            : { duration: 0.65, delay: 0.15, ease: "easeOut" }
                        }
                        className="mt-3 text-base font-medium text-white/80 sm:mt-4 sm:text-lg md:text-xl"
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

        {/* Indicador inferior (ex: 3/10) */}
        <div className="pointer-events-none fixed bottom-4 left-0 right-0 z-20 px-4 sm:bottom-5 sm:px-6 md:px-10">
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


