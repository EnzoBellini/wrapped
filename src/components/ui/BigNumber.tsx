import type { HTMLAttributes } from "react";

type BigNumberProps = HTMLAttributes<HTMLDivElement> & {
  value: string;
  suffix?: string;
};

export function BigNumber({ value, suffix, className = "", ...props }: BigNumberProps) {
  return (
    <div className={["flex items-end gap-3", className].join(" ")} {...props}>
      <span
        className={[
          "text-7xl font-semibold leading-none tracking-tight sm:text-8xl md:text-9xl",
          "bg-gradient-to-br from-lime-200 via-fuchsia-200 to-orange-200 bg-clip-text text-transparent",
        ].join(" ")}
      >
        {value}
      </span>
      {suffix ? (
        <span className="pb-2 text-sm font-medium tracking-[0.22em] text-white/70 sm:text-base">
          {suffix.toUpperCase()}
        </span>
      ) : null}
    </div>
  );
}


