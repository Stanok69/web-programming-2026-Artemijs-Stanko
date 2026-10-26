import "./style.css";
import { initProjectForm } from "./form";
import { renderProjects } from "./render";
import { loadProjects, saveProjects } from "./storage";
import type { Project, ProjectFilter } from "./types";
import { initAnnouncement, initNavigation } from "./ui";

const projectGrid = document.querySelector<HTMLElement>("#projectGrid");
const deadlineList = document.querySelector<HTMLElement>("#deadlineList");
const activeProjectCount = document.querySelector<HTMLElement>("#activeProjectCount");

if (!projectGrid || !deadlineList) {
  throw new Error("Project or deadline container is missing in index.html");
}

const filterButtons = Array.from(document.querySelectorAll<HTMLButtonElement>("[data-filter]"));

const isProjectFilter = (value: string): value is ProjectFilter =>
  value === "all" || value === "active" || value === "done";

let projects: Project[] = loadProjects([]);
let activeFilter: ProjectFilter = "all";

const syncActiveProjectCount = (): void => {
  if (activeProjectCount !== null) {
    const active = projects.filter((project) => project.status === "active").length;
    activeProjectCount.textContent = String(active);
  }
};

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
  syncActiveProjectCount();
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

projectGrid.addEventListener("click", (event) => {
  const target = event.target;

  if (!(target instanceof Element)) {
    return;
  }

  const deleteButton = target.closest<HTMLButtonElement>("[data-action='delete']");

  if (deleteButton === null) {
    return;
  }

  const card = deleteButton.closest<HTMLElement>("[data-project-id]");
  const projectId = card?.dataset.projectId;

  if (projectId === undefined) {
    return;
  }

  projects = projects.filter((project) => project.id !== projectId);
  saveProjects(projects);
  renderVisibleProjects();
});

syncFilterButtons();
renderVisibleProjects();
initProjectForm(handleAddProject);
initNavigation();
initAnnouncement();
