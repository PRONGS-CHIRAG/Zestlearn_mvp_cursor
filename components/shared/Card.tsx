import { HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLDivElement> {
  padding?: "sm" | "md" | "lg";
}

const paddings = {
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
};

export default function Card({
  padding = "md",
  className = "",
  children,
  ...props
}: Props) {
  return (
    <div
      {...props}
      className={`rounded-xl border border-slate-100 bg-white shadow-sm ${paddings[padding]} ${className}`}
    >
      {children}
    </div>
  );
}
