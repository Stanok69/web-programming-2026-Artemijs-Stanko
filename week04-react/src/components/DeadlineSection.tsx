import type { Deadline, LoadState } from "../types";
import DeadlineItem from "./DeadlineItem";
import ErrorBox from "./ErrorBox";
import LoadingBox from "./LoadingBox";
import SectionHeading from "./SectionHeading";

interface DeadlineSectionProps {
  deadlines: LoadState<Deadline[]>;
  onRetry: () => void;
}

function DeadlineSection({ deadlines, onRetry }: DeadlineSectionProps) {
  return (
    <section id="deadlines" className="rounded-[18px] border border-line bg-white p-6">
      <SectionHeading eyebrow="DEADLINES" title="Coming up">
        <a
          className="rounded text-xs font-extrabold text-brand transition hover:text-brand-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
          href="#"
        >
          See all
        </a>
      </SectionHeading>

      <div className="grid gap-1">
        {deadlines.status === "loading" && <LoadingBox text="Loading deadlines…" />}

        {deadlines.status === "error" && (
          <ErrorBox message={deadlines.message} onRetry={onRetry} />
        )}

        {deadlines.status === "success" && deadlines.data.length === 0 && (
          <p className="px-2 py-[14px] text-[13px] text-muted">No upcoming deadlines.</p>
        )}

        {deadlines.status === "success" &&
          deadlines.data.length > 0 &&
          [...deadlines.data]
            .sort(
              (first, second) =>
                first.date.localeCompare(second.date) || first.time.localeCompare(second.time),
            )
            .map((deadline) => <DeadlineItem key={deadline.id} deadline={deadline} />)}
      </div>
    </section>
  );
}

export default DeadlineSection;
