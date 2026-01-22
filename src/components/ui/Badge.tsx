import type { HTMLAttributes } from "react";

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  variant?: "glass" | "solid";
};

export function Badge({ className = "", variant = "glass", ...props }: BadgeProps) {
  const base =
    "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium tracking-wide";
  const styles =
    variant === "solid"
      ? "bg-white/90 text-black"
      : "border border-white/15 bg-white/10 text-white/80 backdrop-blur-md";

  return <span className={[base, styles, className].join(" ")} {...props} />;
}


