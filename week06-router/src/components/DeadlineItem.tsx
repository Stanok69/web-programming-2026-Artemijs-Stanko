import { splitDate } from "../date";
import type { Deadline, DeadlineTone } from "../types";

interface DeadlineItemProps {
  deadline: Deadline;
}

const deadlineTone: Record<DeadlineTone, string> = {
  urgent: "bg-[#fdeeee] text-[#c64444]",
  soon: "bg-[#fff5de] text-[#aa7416]",
  later: "bg-[#f1f3f6] text-[#6f7788]",
};

function DeadlineItem({ deadline }: DeadlineItemProps) {
  const date = splitDate(deadline.date);

  return (
    <article className="grid grid-cols-[auto_1fr_auto] items-center gap-3.5 border-b border-line px-2 py-[14px] last:border-0 max-sm:grid-cols-[auto_1fr]">
      <div className="grid size-[46px] min-h-[50px] place-content-center rounded-xl bg-[#f8fafc] text-center">
        <strong className="text-[17px] leading-none">{date.day}</strong>
        <span className="mt-1 text-[9px] font-extrabold text-muted">{date.month}</span>
      </div>

      <div className="grid gap-[3px]">
        <strong className="text-[13px]">{deadline.title}</strong>
        <span className="text-[11px] text-muted">
          {deadline.course} · {deadline.time}
        </span>
      </div>

      <span
        className={`inline-flex min-h-[25px] items-center rounded-full px-[9px] text-[10px] font-extrabold max-sm:col-start-2 max-sm:justify-self-start ${deadlineTone[deadline.tone]}`}
      >
        {deadline.label}
      </span>
    </article>
  );
}

export default DeadlineItem;
