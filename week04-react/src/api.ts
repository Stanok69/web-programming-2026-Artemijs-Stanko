import { isDeadline, isProject, isRecord } from "./guards";
import type { CurrentWeather, Deadline, Project } from "./types";

const PROJECTS_URL = "/api/projects.json";
const DEADLINES_URL = "/api/deadlines.json";
const WEATHER_URL =
  "https://api.open-meteo.com/v1/forecast?latitude=56.95&longitude=24.11&current=temperature_2m,wind_speed_10m,weather_code&timezone=Europe%2FRiga";
const REQUEST_TIMEOUT_MS = 8000;

const getJson = async (url: string): Promise<unknown> => {
  const response = await fetch(url, { signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS) });

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
  if (error instanceof DOMException && error.name === "TimeoutError") {
    return "The server took too long to answer. Check your connection and try again.";
  }

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

export const fetchWeather = async (): Promise<CurrentWeather> => {
  const data = await getJson(WEATHER_URL);

  if (!isRecord(data) || !isRecord(data.current)) {
    throw new Error("Weather came back in an unexpected format.");
  }

  const { time, temperature_2m, wind_speed_10m, weather_code } = data.current;

  if (
    typeof time !== "string" ||
    typeof temperature_2m !== "number" ||
    typeof wind_speed_10m !== "number" ||
    typeof weather_code !== "number"
  ) {
    throw new Error("Weather came back in an unexpected format.");
  }

  return {
    time,
    temperature: temperature_2m,
    windSpeed: wind_speed_10m,
    weatherCode: weather_code,
  };
};
