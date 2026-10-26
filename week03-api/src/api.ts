import { isDeadline, isProject } from "./guards";
import type { Deadline, Project } from "./types";

const PROJECTS_URL = "/api/projects.json";
const DEADLINES_URL = "/api/deadlines.json";

const getJson = async (url: string): Promise<unknown> => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}.`);
  }

  try {
    const data: unknown = await response.json();
    return data;
  } catch {
    throw new Error("The server did not send valid JSON.");
  }
};

export const describeError = (error: unknown): string => {
  if (error instanceof TypeError) {
    return "The server could not be reached. Check your connection and try again.";
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Something unexpected happened. Please try again.";
};

const isProjectList = (value: unknown): value is Project[] =>
  Array.isArray(value) && value.every(isProject);

const isDeadlineList = (value: unknown): value is Deadline[] =>
  Array.isArray(value) && value.every(isDeadline);

export const fetchProjects = async (): Promise<Project[]> => {
  const data = await getJson(PROJECTS_URL);

  if (!isProjectList(data)) {
    throw new Error("Projects came back in an unexpected format.");
  }

  return data;
};

export const fetchDeadlines = async (): Promise<Deadline[]> => {
  const data = await getJson(DEADLINES_URL);

  if (!isDeadlineList(data)) {
    throw new Error("Deadlines came back in an unexpected format.");
  }

  return data;
};
