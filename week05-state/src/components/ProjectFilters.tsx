import type { ProjectFilter } from "../types";

interface ProjectFiltersProps {
  current: ProjectFilter;
  onChange: (filter: ProjectFilter) => void;
}

const filters: { value: ProjectFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "active", label: "Active" },
  { value: "done", label: "Done" },
];

function ProjectFilters({ current, onChange }: ProjectFiltersProps) {
  return (
    <div
      className="inline-flex gap-1 rounded-xl border border-line bg-white p-1 max-sm:w-full"
      role="group"
      aria-label="Project filters"
    >
      {filters.map(({ value, label }) => {
        const isActive = value === current;

        return (
          <button
            key={value}
            type="button"
            className="rounded-lg px-2.5 py-1.5 text-xs font-bold text-muted transition hover:bg-[#f0f2f7] hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 data-[active=true]:bg-[#f0f2f7] data-[active=true]:text-ink max-sm:flex-1"
            data-active={isActive ? "true" : "false"}
            aria-pressed={isActive}
            onClick={() => onChange(value)}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}

export default ProjectFilters;
