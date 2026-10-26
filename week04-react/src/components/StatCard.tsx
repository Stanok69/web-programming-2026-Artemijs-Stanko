type StatTone = "neutral" | "positive" | "danger";

interface StatCardProps {
  index: string;
  label: string;
  value: string;
  note: string;
  tone?: StatTone;
}

const noteTone: Record<StatTone, string> = {
  neutral: "text-muted",
  positive: "text-[#1ca76f]",
  danger: "text-[#c64444]",
};

function StatCard({ index, label, value, note, tone = "neutral" }: StatCardProps) {
  return (
    <article className="flex gap-3.5 rounded-[18px] border border-line bg-white p-5 shadow-soft">
      <div className="grid size-10 shrink-0 place-items-center rounded-xl bg-brand-soft text-[11px] font-extrabold text-brand">
        {index}
      </div>
      <div>
        <p className="mb-1 block text-xs text-muted">{label}</p>
        <strong className="block text-[26px] leading-[1.1]">{value}</strong>
        <span className={`mt-[7px] block text-[10px] font-bold ${noteTone[tone]}`}>{note}</span>
      </div>
    </article>
  );
}

export default StatCard;
