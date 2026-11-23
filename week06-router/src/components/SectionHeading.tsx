import type { ReactNode } from "react";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  children?: ReactNode;
  className?: string;
}

function SectionHeading({
  eyebrow,
  title,
  children,
  className = "mb-5 flex items-center justify-between gap-6",
}: SectionHeadingProps) {
  return (
    <div className={className}>
      <div>
        <p className="mb-2.5 text-[11px] font-extrabold tracking-[0.14em] text-brand">{eyebrow}</p>
        <h2 className="text-[28px] font-bold tracking-[-0.035em]">{title}</h2>
      </div>
      {children}
    </div>
  );
}

export default SectionHeading;
