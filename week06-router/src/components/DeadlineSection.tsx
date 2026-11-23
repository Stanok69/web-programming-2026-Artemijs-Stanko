import { Link } from "react-router";
import type { Deadline, LoadState } from "../types";
import DeadlineItem from "./DeadlineItem";
import ErrorBox from "./ErrorBox";
import LoadingBox from "./LoadingBox";
import SectionHeading from "./SectionHeading";

interface DeadlineSectionProps {
  deadlines: LoadState<Deadline[]>;
  onRetry: () => void;
  limit?: number;
}

function DeadlineSection({ deadlines, onRetry, limit }: DeadlineSectionProps) {
  const sorted =
    deadlines.status === "success"
      ? [...deadlines.data].sort(
          (first, second) =>
            first.date.localeCompare(second.date) || first.time.localeCompare(second.time),
        )
      : [];
  const visible = limit === undefined ? sorted : sorted.slice(0, limit);

  return (
    <section id="deadlines" className="rounded-[18px] border border-line bg-white p-6">
      <SectionHeading
        eyebrow="DEADLINES"
        title={limit === undefined ? "All deadlines" : "Coming up"}
      >
        {limit !== undefined && (
          <Link
            className="rounded text-xs font-extrabold text-brand transition hover:text-brand-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
            to="/deadlines"
          >
            See all
          </Link>
        )}
      </SectionHeading>

      <div className="grid gap-1">
        {deadlines.status === "loading" && <LoadingBox text="Loading deadlines…" />}

        {deadlines.status === "error" && (
          <ErrorBox message={deadlines.message} onRetry={onRetry} />
        )}

        {deadlines.status === "success" && sorted.length === 0 && (
          <p className="px-2 py-[14px] text-[13px] text-muted">No upcoming deadlines.</p>
        )}

        {deadlines.status === "success" &&
          visible.map((deadline) => <DeadlineItem key={deadline.id} deadline={deadline} />)}
      </div>
    </section>
  );
}

export default DeadlineSection;
