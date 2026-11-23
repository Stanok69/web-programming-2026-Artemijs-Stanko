import { useState } from "react";

function Announcement() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="mx-auto w-full max-w-[1180px] px-5 pt-6 max-sm:px-3.5">
      <div className="flex items-start gap-3 rounded-2xl border border-brand/20 bg-brand-soft/70 px-4 py-3.5 shadow-soft sm:items-center">
        <span
          className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full bg-linear-to-br from-brand to-[#8a7dff] text-[9px] font-extrabold text-white sm:mt-0"
          aria-hidden="true"
        >
          NEW
        </span>
        <p className="flex-1 text-[13px] leading-relaxed">
          <strong className="font-extrabold">React migration is live.</strong> CampusFlow now
          renders from components with typed props — same layout, clearer data flow.
        </p>
        <button
          type="button"
          className="grid size-8 shrink-0 place-items-center rounded-lg text-lg leading-none text-muted transition hover:bg-white hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
          aria-label="Dismiss announcement"
          onClick={() => setIsVisible(false)}
        >
          &times;
        </button>
      </div>
    </div>
  );
}

export default Announcement;
