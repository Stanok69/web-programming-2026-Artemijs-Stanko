import "./style.css";
import { describeError, fetchDeadlines, fetchProjects, fetchWeather } from "./api";
import { initProjectForm } from "./form";
import { renderDeadlines, renderProjects } from "./render";
import { loadProjects, saveProjects } from "./storage";
import type { CurrentWeather, Deadline, LoadState, Project, ProjectFilter } from "./types";
import { initAnnouncement, initNavigation } from "./ui";
import { describeWeather } from "./weather";

const projectGrid = document.querySelector<HTMLElement>("#projectGrid");
const deadlineList = document.querySelector<HTMLElement>("#deadlineList");
const activeProjectCount = document.querySelector<HTMLElement>("#activeProjectCount");
const projectSubmit = document.querySelector<HTMLButtonElement>("#projectSubmit");
const weatherTemperature = document.querySelector<HTMLElement>("#weatherTemperature");
const weatherDetails = document.querySelector<HTMLElement>("#weatherDetails");

if (!projectGrid || !deadlineList) {
  throw new Error("Project or deadline container is missing in index.html");
}

const filterButtons = Array.from(document.querySelectorAll<HTMLButtonElement>("[data-filter]"));

const isProjectFilter = (value: string): value is ProjectFilter =>
  value === "all" || value === "active" || value === "done";

let projectsState: LoadState<Project[]> = { status: "loading" };
let deadlinesState: LoadState<Deadline[]> = { status: "loading" };
let weatherState: LoadState<CurrentWeather> = { status: "loading" };
let localProjects: Project[] = loadProjects([]);
let activeFilter: ProjectFilter = "all";

const localProjectIds = (): Set<string> =>
  new Set(localProjects.map((project) => project.id));

const combineProjects = (apiProjects: Project[]): Project[] => [
  ...localProjects,
  ...apiProjects,
];

const filterProjects = (projects: Project[]): Project[] =>
  activeFilter === "all"
    ? projects
    : projects.filter((project) => project.status === activeFilter);

const syncFilterButtons = (): void => {
  filterButtons.forEach((button) => {
    const isActive = button.dataset.filter === activeFilter;
    button.dataset.active = String(isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
};

const syncActiveProjectCount = (): void => {
  if (activeProjectCount === null) {
    return;
  }

  switch (projectsState.status) {
    case "loading":
      activeProjectCount.textContent = "…";
      return;
    case "error":
      activeProjectCount.textContent = "–";
      return;
    case "success": {
      const projects = combineProjects(projectsState.data);
      const active = projects.filter((project) => project.status === "active").length;
      activeProjectCount.textContent = String(active);
      return;
    }
    default: {
      const check: never = projectsState;
      return check;
    }
  }
};

const syncSubmitState = (): void => {
  if (projectSubmit === null) {
    return;
  }

  const canAdd = projectsState.status === "success";
  projectSubmit.disabled = !canAdd;
  projectSubmit.title = canAdd ? "" : "Wait until the projects have loaded.";
};

const renderProjectsSection = (): void => {
  if (projectsState.status === "success") {
    const projects = filterProjects(combineProjects(projectsState.data));

    renderProjects(
      { status: "success", data: projects },
      projectGrid,
      retryProjects,
      localProjectIds(),
    );
    return;
  }

  renderProjects(projectsState, projectGrid, retryProjects, localProjectIds());
};

const renderDeadlinesSection = (): void => {
  renderDeadlines(deadlinesState, deadlineList, retryDeadlines);
};

const loadProjectsSection = async (): Promise<void> => {
  projectsState = { status: "loading" };
  renderProjectsSection();
  syncActiveProjectCount();
  syncSubmitState();

  try {
    const projects = await fetchProjects();
    projectsState = { status: "success", data: projects };
  } catch (error) {
    projectsState = { status: "error", message: describeError(error) };
  }

  renderProjectsSection();
  syncActiveProjectCount();
  syncSubmitState();
};

const loadDeadlinesSection = async (): Promise<void> => {
  deadlinesState = { status: "loading" };
  renderDeadlinesSection();

  try {
    const deadlines = await fetchDeadlines();
    deadlinesState = { status: "success", data: deadlines };
  } catch (error) {
    deadlinesState = { status: "error", message: describeError(error) };
  }

  renderDeadlinesSection();
};

const retryProjects = (): void => {
  void loadProjectsSection();
};

const retryDeadlines = (): void => {
  void loadDeadlinesSection();
};

const renderWeatherSection = (): void => {
  if (weatherTemperature === null || weatherDetails === null) {
    return;
  }

  switch (weatherState.status) {
    case "loading":
      weatherTemperature.textContent = "…";
      weatherDetails.textContent = "Loading weather…";
      return;
    case "error":
      weatherTemperature.textContent = "—";
      weatherDetails.textContent = "Weather unavailable";
      return;
    case "success": {
      const weather = weatherState.data;
      weatherTemperature.textContent = `${Math.round(weather.temperature)}°C`;
      weatherDetails.textContent = `${describeWeather(weather.weatherCode)} · ${Math.round(weather.windSpeed)} km/h`;
      return;
    }
    default: {
      const check: never = weatherState;
      return check;
    }
  }
};

const loadWeatherSection = async (): Promise<void> => {
  weatherState = { status: "loading" };
  renderWeatherSection();

  try {
    const weather = await fetchWeather();
    weatherState = { status: "success", data: weather };
  } catch (error) {
    weatherState = { status: "error", message: describeError(error) };
  }

  renderWeatherSection();
};

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.dataset.filter;

    if (value === undefined || !isProjectFilter(value)) {
      return;
    }

    activeFilter = value;
    syncFilterButtons();
    renderProjectsSection();
  });
});

const handleAddProject = (project: Project): void => {
  localProjects = [project, ...localProjects];
  saveProjects(localProjects);

  activeFilter = "all";
  syncFilterButtons();
  renderProjectsSection();
  syncActiveProjectCount();
};

const handleDeleteProject = (projectId: string): void => {
  if (!localProjectIds().has(projectId)) {
    return;
  }

  localProjects = localProjects.filter((project) => project.id !== projectId);
  saveProjects(localProjects);
  renderProjectsSection();
  syncActiveProjectCount();
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

  handleDeleteProject(projectId);
});

syncFilterButtons();
syncActiveProjectCount();
syncSubmitState();
renderProjectsSection();
renderDeadlinesSection();
renderWeatherSection();
initProjectForm(handleAddProject);
initNavigation();
initAnnouncement();
void loadProjectsSection();
void loadDeadlinesSection();
void loadWeatherSection();
