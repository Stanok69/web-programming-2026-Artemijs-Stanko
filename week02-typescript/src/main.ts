import "./style.css";
import { initialDeadlines, initialProjects } from "./data";
import { initProjectForm } from "./form";
import { renderDeadlines, renderProjects } from "./render";
import { loadProjects, saveProjects } from "./storage";
import type { Project, ProjectFilter } from "./types";
import { initAnnouncement, initNavigation } from "./ui";

const projectGrid = document.querySelector<HTMLElement>("#projectGrid");
const deadlineList = document.querySelector<HTMLElement>("#deadlineList");

if (!projectGrid || !deadlineList) {
  throw new Error("Project or deadline container is missing in index.html");
}

const filterButtons = Array.from(document.querySelectorAll<HTMLButtonElement>("[data-filter]"));

const isProjectFilter = (value: string): value is ProjectFilter =>
  value === "all" || value === "active" || value === "done";

let projects: Project[] = loadProjects(initialProjects);
let activeFilter: ProjectFilter = "all";

const syncFilterButtons = (): void => {
  filterButtons.forEach((button) => {
    const isActive = button.dataset.filter === activeFilter;
    button.dataset.active = String(isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
};

const renderVisibleProjects = (): void => {
  const visibleProjects =
    activeFilter === "all"
      ? projects
      : projects.filter((project) => project.status === activeFilter);

  renderProjects(visibleProjects, projectGrid);
};

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.dataset.filter;

    if (value === undefined || !isProjectFilter(value)) {
      return;
    }

    activeFilter = value;
    syncFilterButtons();
    renderVisibleProjects();
  });
});

const handleAddProject = (project: Project): void => {
  projects = [project, ...projects];
  saveProjects(projects);

  activeFilter = "all";
  syncFilterButtons();
  renderVisibleProjects();
};

syncFilterButtons();
renderVisibleProjects();
renderDeadlines(initialDeadlines, deadlineList);
initProjectForm(handleAddProject);
initNavigation();
initAnnouncement();
