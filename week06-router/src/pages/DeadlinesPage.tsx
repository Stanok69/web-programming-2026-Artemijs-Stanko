import DeadlineSection from "../components/DeadlineSection";
import type { Deadline, LoadState } from "../types";

interface DeadlinesPageProps {
  deadlines: LoadState<Deadline[]>;
  onRetry: () => void;
}

function DeadlinesPage({ deadlines, onRetry }: DeadlinesPageProps) {
  return (
    <section className="mx-auto grid w-full max-w-[1180px] gap-[18px] px-5 pt-[34px] pb-16 max-sm:px-3.5">
      <DeadlineSection deadlines={deadlines} onRetry={onRetry} />
    </section>
  );
}

export default DeadlinesPage;
