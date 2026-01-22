import type { HTMLAttributes } from "react";

type KickerProps = HTMLAttributes<HTMLParagraphElement>;

export function Kicker({ className = "", ...props }: KickerProps) {
  return (
    <p
      className={[
        "text-[11px] font-semibold tracking-[0.28em] text-white/70",
        className,
      ].join(" ")}
      {...props}
    />
  );
}


