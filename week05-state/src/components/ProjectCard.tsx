import { formatDate } from "../date";
import type { Category, Project, ProjectStatus } from "../types";

interface ProjectCardProps {
  project: Project;
}

const categoryBadge: Record<Category, string> = {
  Frontend: "bg-[#f0edff] text-[#6352ed]",
  API: "bg-[#eaf3ff] text-[#2f78d6]",
  JavaScript: "bg-[#e9f8f2] text-[#16875b]",
  Design: "bg-[#fff5de] text-[#aa7416]",
};

const categoryBar: Record<Category, string> = {
  Frontend: "bg-brand",
  API: "bg-[#3788ff]",
  JavaScript: "bg-[#1ca76f]",
  Design: "bg-[#c99a2e]",
};

const statusBadge: Record<ProjectStatus, string> = {
  active: "bg-[#eef6ff] text-[#3788ff]",
  done: "bg-[#edf9f4] text-[#1ca76f]",
};

const statusLabel: Record<ProjectStatus, string> = {
  active: "Active",
  done: "Done",
};

function ProjectCard({ project }: ProjectCardProps) {
  const dueLabel =
    project.status === "done"
      ? `Submitted ${formatDate(project.dueDate)}`
      : `Due ${formatDate(project.dueDate)}`;

  return (
    <article className="group rounded-[18px] border border-line bg-white p-[22px] transition duration-200 hover:-translate-y-1 hover:border-[#d5d9e6] hover:shadow-card">
      <div className="flex items-center justify-between gap-3">
        <span
          className={`inline-flex min-h-[25px] items-center rounded-full px-[9px] text-[10px] font-extrabold ${categoryBadge[project.category]}`}
        >
          {project.category}
        </span>
        <span
          className={`inline-flex min-h-[25px] items-center rounded-full px-[9px] text-[10px] font-extrabold ${statusBadge[project.status]}`}
        >
          {statusLabel[project.status]}
        </span>
      </div>

      <h3 className="mt-6 mb-2 text-xl tracking-[-0.025em]">{project.title}</h3>
      <p className="min-h-[66px] text-[13px] text-muted">{project.description}</p>

      <div className="mt-[22px] mb-2.5 flex items-center justify-between gap-3 text-[10px] font-bold text-muted">
        <span>{dueLabel}</span>
        <span>{project.progress}% complete</span>
      </div>

      <div className="h-[7px] overflow-hidden rounded-full bg-[#eceef4]">
        <div
          className={`h-full rounded-[inherit] ${categoryBar[project.category]}`}
          style={{ width: `${project.progress}%` }}
        ></div>
      </div>

      <div className="mt-[18px] flex items-center justify-between gap-3">
        <a
          className="inline-block rounded text-xs font-extrabold text-brand transition hover:text-brand-dark group-hover:translate-x-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
          href="#"
        >
          {project.status === "done" ? "View submission →" : "Open project →"}
        </a>
      </div>
    </article>
  );
}

export default ProjectCard;
