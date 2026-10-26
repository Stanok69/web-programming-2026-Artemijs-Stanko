import { isProject } from "./guards";
import type { Project } from "./types";

const STORAGE_KEY = "campusflow.projects";

export const loadProjects = (fallback: Project[]): Project[] => {
  const stored = localStorage.getItem(STORAGE_KEY);

  if (stored === null) {
    return fallback;
  }

  try {
    const parsed: unknown = JSON.parse(stored);

    if (!Array.isArray(parsed)) {
      return fallback;
    }

    const projects = parsed.filter(isProject);

    return projects.length === parsed.length ? projects : fallback;
  } catch {
    return fallback;
  }
};

export const saveProjects = (projects: Project[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
  } catch {
    console.warn("Projects could not be saved to localStorage.");
  }
};
