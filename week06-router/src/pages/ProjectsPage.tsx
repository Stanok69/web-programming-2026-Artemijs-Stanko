import ProjectSection from "../components/ProjectSection";
import type { LoadState, Project } from "../types";

interface ProjectsPageProps {
  projects: LoadState<Project[]>;
  onRetry: () => void;
  onAddProject: (project: Project) => void;
}

function ProjectsPage({ projects, onRetry, onAddProject }: ProjectsPageProps) {
  return <ProjectSection projects={projects} onRetry={onRetry} onAdd={onAddProject} />;
}

export default ProjectsPage;
