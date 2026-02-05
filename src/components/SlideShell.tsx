import type { ReactNode } from "react";
import { Badge } from "./ui/Badge";
import { Kicker } from "./ui/Kicker";

type Accent = "lime" | "pink" | "purple" | "orange";

const accentGlow: Record<Accent, string> = {
  lime: "from-lime-300/55 via-emerald-200/35 to-cyan-200/25",
  pink: "from-fuchsia-400/55 via-pink-300/35 to-orange-200/25",
  purple: "from-violet-400/55 via-fuchsia-300/35 to-sky-200/25",
  orange: "from-orange-300/55 via-rose-300/35 to-fuchsia-200/25",
};

export type SlideShellProps = {
  kicker?: string;
  title?: string;
  body?: string;
  accent?: Accent;
  badges?: string[];
  header?: ReactNode;
  children?: ReactNode;
};

export function SlideShell({
  kicker,
  title,
  body,
  accent = "lime",
  badges = [],
  header,
  children,
}: SlideShellProps) {
  return (
    <div className="relative w-full max-w-5xl min-w-0 wrapped-content">
      {/* glow externo (sutil) - reduzido no mobile para performance */}
      <div
        className={[
          "pointer-events-none absolute -inset-4 -z-10 rounded-[28px] bg-gradient-to-br opacity-60 sm:-inset-6 sm:rounded-[44px] sm:opacity-70 sm:blur-3xl",
          accentGlow[accent],
        ].join(" ")}
      />

      {/* card */}
      <div className="relative overflow-hidden rounded-2xl border border-white/14 bg-white/8 p-4 shadow-[0_30px_120px_-30px_rgba(0,0,0,0.65)] backdrop-blur-xl sm:rounded-[28px] sm:p-5 md:p-7 lg:p-10 min-w-0">
        <div className="flex flex-wrap items-center justify-between gap-2 sm:gap-4 min-w-0">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 min-w-0">
            {kicker ? <Kicker>{kicker.toUpperCase()}</Kicker> : null}
            {badges.length ? (
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                {badges.map((b) => (
                  <Badge key={b}>{b}</Badge>
                ))}
              </div>
            ) : null}
          </div>
        </div>

        {header ? (
          header
        ) : (
          <>
            {title ? (
              <h1 className="mt-2 min-w-0 text-balance break-words text-xl font-semibold leading-[1.08] tracking-tight text-white sm:mt-3 sm:text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
                {title}
              </h1>
            ) : null}

            {body ? (
              <p className="mt-2 min-w-0 max-w-full overflow-hidden text-pretty break-words text-xs leading-relaxed text-white/72 sm:mt-3 sm:max-w-3xl sm:text-sm md:text-base lg:text-lg">
                {body}
              </p>
            ) : null}
          </>
        )}

        {children ? <div className="mt-4 sm:mt-6 md:mt-8 min-w-0">{children}</div> : null}
      </div>
    </div>
  );
}


