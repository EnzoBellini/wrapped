import type { HTMLAttributes } from "react";

type KickerProps = HTMLAttributes<HTMLParagraphElement>;

export function Kicker({ className = "", ...props }: KickerProps) {
  return (
    <p
      className={[
        "min-w-0 break-words text-[10px] font-semibold tracking-[0.22em] text-white/70 sm:text-[11px] sm:tracking-[0.28em]",
        className,
      ].join(" ")}
      {...props}
    />
  );
}


