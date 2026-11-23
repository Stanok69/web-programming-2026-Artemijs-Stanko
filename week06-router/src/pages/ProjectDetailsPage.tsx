import { Link, useParams } from "react-router";
import EmptyBox from "../components/EmptyBox";
import ErrorBox from "../components/ErrorBox";
import LoadingBox from "../components/LoadingBox";
import { daysUntil, formatDate } from "../format";
import { categoryBadge, progressColor, statusBadge, statusLabel } from "../projectStyles";
import type { LoadState, Project } from "../types";

interface ProjectDetailsPageProps {
  projects: LoadState<Project[]>;
  onRetry: () => void;
}

function dueText(project: Project): string {
  if (project.status === "done") {
    return `Submitted ${formatDate(project.dueDate)}`;
  }

  const days = daysUntil(project.dueDate);

  if (days < 0) {
    return `Overdue since ${formatDate(project.dueDate)}`;
  }

  if (days === 0) {
    return `Due ${formatDate(project.dueDate)} — today`;
  }

  const unit = days === 1 ? "day" : "days";

  return `Due ${formatDate(project.dueDate)} — in ${days} ${unit}`;
}

function ProjectDetailsPage({ projects, onRetry }: ProjectDetailsPageProps) {
  const { projectId } = useParams();

  const project =
    projects.status === "success"
      ? projects.data.find((item) => item.id === projectId)
      : undefined;

  return (
    <section className="mx-auto w-full max-w-[1180px] px-5 pt-[34px] pb-16 max-sm:px-3.5">
      <Link
        className="inline-flex items-center gap-1 rounded text-xs font-extrabold text-brand transition hover:text-brand-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
        to="/projects"
      >
        ← All projects
      </Link>

      <div className="mt-5">
        {projects.status === "loading" && <LoadingBox text="Loading project…" />}

        {projects.status === "error" && (
          <ErrorBox message={projects.message} onRetry={onRetry} />
        )}

        {projects.status === "success" && project === undefined && (
          <EmptyBox
            title="Project not found"
            text={`No project matches the id “${projectId ?? ""}”. Check the address or return to the project list.`}
          />
        )}

        {projects.status === "success" && project !== undefined && (
          <article className="rounded-[18px] border border-line bg-white p-6 max-sm:p-5">
            <div className="flex flex-wrap items-center gap-2">
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

            <h1 className="mt-4 max-w-[820px] text-[clamp(30px,4vw,44px)] leading-[1.05] font-bold tracking-[-0.04em]">
              {project.title}
            </h1>

            <p className="mt-3 max-w-[720px] text-sm text-muted">{project.description}</p>

            <div className="mt-7 mb-2.5 flex items-center justify-between gap-3 text-[11px] font-bold text-muted">
              <span>{dueText(project)}</span>
              <span>{project.progress}% complete</span>
            </div>

            <div className="h-[9px] max-w-[540px] overflow-hidden rounded-full bg-[#eceef4]">
              <div
                className={`h-full rounded-[inherit] ${progressColor[project.category]}`}
                style={{ width: `${project.progress}%` }}
              ></div>
            </div>
          </article>
        )}
      </div>
    </section>
  );
}

export default ProjectDetailsPage;
