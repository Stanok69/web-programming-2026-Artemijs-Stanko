import type { ReactNode } from "react";

interface FieldProps {
  label: string;
  htmlFor: string;
  children: ReactNode;
  hint?: ReactNode;
  className?: string;
}

function Field({ label, htmlFor, children, hint, className = "" }: FieldProps) {
  return (
    <div className={`grid gap-1.5 ${className}`}>
      <label className="text-xs font-bold" htmlFor={htmlFor}>
        {label}
      </label>
      {children}
      {hint}
    </div>
  );
}

export default Field;
