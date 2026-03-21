import { ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
}

const variants = {
  primary: "bg-indigo-600 text-white hover:bg-indigo-700",
  secondary: "bg-slate-100 text-slate-800 hover:bg-slate-200",
  ghost: "bg-transparent text-slate-600 hover:bg-slate-100",
};

const sizes = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-5 py-2.5 text-sm",
  lg: "px-6 py-3 text-base",
};

export default function Button({
  variant = "primary",
  size = "md",
  className = "",
  children,
  disabled,
  ...props
}: Props) {
  return (
    <button
      {...props}
      disabled={disabled}
      className={`rounded-xl font-semibold transition disabled:opacity-40 ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </button>
  );
}
