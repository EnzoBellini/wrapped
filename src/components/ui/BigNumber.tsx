import type { HTMLAttributes } from "react";

type BigNumberProps = HTMLAttributes<HTMLDivElement> & {
  value: string;
  suffix?: string;
};

export function BigNumber({ value, suffix, className = "", ...props }: BigNumberProps) {
  return (
    <div className={["flex min-w-0 flex-wrap items-end gap-2 break-words sm:gap-3", className].join(" ")} {...props}>
      <span
        className={[
          "text-4xl font-semibold leading-none tracking-tight sm:text-6xl sm:text-7xl md:text-8xl lg:text-9xl",
          "bg-gradient-to-br from-lime-200 via-fuchsia-200 to-orange-200 bg-clip-text text-transparent",
        ].join(" ")}
      >
        {value}
      </span>
      {suffix ? (
        <span className="pb-1 text-xs font-medium tracking-[0.18em] text-white/70 sm:pb-2 sm:text-sm sm:tracking-[0.22em] md:text-base">
          {suffix.toUpperCase()}
        </span>
      ) : null}
    </div>
  );
}


