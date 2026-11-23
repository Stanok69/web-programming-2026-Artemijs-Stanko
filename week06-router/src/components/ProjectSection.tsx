import { useState } from "react";
import type { LoadState, Project, ProjectFilter } from "../types";
import AddProjectForm from "./AddProjectForm";
import ProjectFilters from "./ProjectFilters";
import ProjectList from "./ProjectList";
import SectionHeading from "./SectionHeading";

interface ProjectSectionProps {
  projects: LoadState<Project[]>;
  onRetry: () => void;
  onAdd: (project: Project) => void;
}

function ProjectSection({ projects, onRetry, onAdd }: ProjectSectionProps) {
  const [filter, setFilter] = useState<ProjectFilter>("all");

  function handleAdd(project: Project): void {
    onAdd(project);
    setFilter("all");
  }

  return (
    <section
      id="projects"
      className="mx-auto w-full max-w-[1180px] px-5 pt-[34px] pb-4 max-sm:px-3.5"
    >
      <SectionHeading
        eyebrow="PROJECTS"
        title="Current work"
        className="mb-5 flex items-center justify-between gap-6 max-sm:flex-col max-sm:items-stretch"
      >
        <ProjectFilters current={filter} onChange={setFilter} />
      </SectionHeading>

      <ProjectList state={projects} filter={filter} onRetry={onRetry} />

      <AddProjectForm disabled={projects.status !== "success"} onAdd={handleAdd} />
    </section>
  );
}

export default ProjectSection;
