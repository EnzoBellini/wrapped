"use client";

import { vibeTracks } from "@/data/data";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const barHeights = [
  [40, 70, 55, 80, 45],
  [60, 45, 75, 50, 70],
  [50, 65, 40, 78, 55],
];

export function VibePlaylist() {
  const reducedMotion = useReducedMotion();

  return (
    <div className="mt-4 space-y-2 sm:mt-6 sm:space-y-3">
      {vibeTracks.map((track, idx) => {
        const heights = barHeights[idx % barHeights.length];

        return (
          <div
            key={track.id}
            className="flex items-center gap-3 overflow-hidden rounded-xl border border-white/10 bg-white/6 px-3 py-2 backdrop-blur-md sm:rounded-2xl sm:gap-4 sm:px-4 sm:py-3"
          >
            {/* Título, artista e duração à esquerda */}
            <div className="flex min-w-0 flex-1 flex-col sm:flex-row sm:items-center sm:gap-2">
              <div className="min-w-0 max-w-full overflow-hidden">
                <p className="truncate text-sm font-semibold text-white">
                  {track.title}
                </p>
                <p className="truncate text-xs text-white/65">{track.artist}</p>
              </div>
              <span className="mt-0.5 shrink-0 text-[11px] font-medium text-white/65 sm:mt-0">
                {track.duration}
              </span>
            </div>

            {/* Animação do equalizer à direita */}
            {!reducedMotion && (
              <div
                className="flex shrink-0 items-end gap-0.5 sm:gap-1 h-8 sm:h-10"
                aria-hidden
              >
                {heights.map((_, barIdx) => (
                  <div
                    key={barIdx}
                    className="w-1 sm:w-1.5 rounded-full bg-gradient-to-b from-lime-300 via-fuchsia-300 to-orange-300 animate-equalizer-bar"
                    style={
                      { "--bar-delay": `${barIdx * 0.08}s` } as React.CSSProperties
                    }
                  />
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
