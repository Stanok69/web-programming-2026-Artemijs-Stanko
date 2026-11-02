import type { ReactNode } from "react";

interface FieldProps {
  label: string;
  htmlFor: string;
  children: ReactNode;
  error?: string;
  hint?: ReactNode;
  className?: string;
}

function Field({ label, htmlFor, children, error, hint, className = "" }: FieldProps) {
  return (
    <div className={`grid gap-1.5 ${className}`}>
      <label className="text-xs font-bold" htmlFor={htmlFor}>
        {label}
      </label>
      {children}
      {hint}
      <p
        id={`${htmlFor}Error`}
        className="min-h-[16px] text-[11px] font-semibold text-[#c64444]"
        role="alert"
      >
        {error ?? ""}
      </p>
    </div>
  );
}

export default Field;
