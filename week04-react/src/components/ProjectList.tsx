import type { LoadState, Project, ProjectFilter } from "../types";
import EmptyBox from "./EmptyBox";
import ErrorBox from "./ErrorBox";
import LoadingBox from "./LoadingBox";
import ProjectCard from "./ProjectCard";

interface ProjectListProps {
  state: LoadState<Project[]>;
  filter: ProjectFilter;
  onRetry: () => void;
}

const gridClass = "grid grid-cols-1 gap-[18px] md:grid-cols-2 lg:grid-cols-3";
const loadingClass =
  "col-span-full rounded-[18px] border border-line bg-white p-6 text-center text-[13px] font-semibold text-muted";
const errorClass =
  "col-span-full rounded-[18px] border border-[#f0d3d3] bg-[#fdf5f5] p-5 text-center";
const emptyClass =
  "col-span-full rounded-[18px] border border-dashed border-line bg-white p-8 text-center";

function ProjectList({ state, filter, onRetry }: ProjectListProps) {
  switch (state.status) {
    case "loading":
      return (
        <div className={gridClass}>
          <LoadingBox text="Loading projects…" className={loadingClass} />
        </div>
      );
    case "error":
      return (
        <div className={gridClass}>
          <ErrorBox message={state.message} onRetry={onRetry} className={errorClass} />
        </div>
      );
    case "success": {
      const visible =
        filter === "all"
          ? state.data
          : state.data.filter((project) => project.status === filter);

      if (visible.length === 0) {
        return (
          <div className={gridClass}>
            <EmptyBox title="No projects here yet" text="Try another filter." className={emptyClass} />
          </div>
        );
      }

      return (
        <div className={gridClass}>
          {visible.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      );
    }
    default: {
      const check: never = state;
      return check;
    }
  }
}

export default ProjectList;
