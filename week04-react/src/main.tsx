import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { describeError, fetchDeadlines, fetchProjects, fetchWeather } from "./api.ts";
import type { CurrentWeather, Deadline, LoadState, Project } from "./types.ts";

const container = document.getElementById("root");

if (container === null) {
  throw new Error("Element #root not found.");
}

const root = createRoot(container);

let projects: LoadState<Project[]> = { status: "loading" };
let deadlines: LoadState<Deadline[]> = { status: "loading" };
let weather: LoadState<CurrentWeather> = { status: "loading" };

const loadProjects = async (): Promise<void> => {
  projects = { status: "loading" };
  render();

  try {
    projects = { status: "success", data: await fetchProjects() };
  } catch (error) {
    projects = { status: "error", message: describeError(error) };
  }

  render();
};

const loadDeadlines = async (): Promise<void> => {
  deadlines = { status: "loading" };
  render();

  try {
    deadlines = { status: "success", data: await fetchDeadlines() };
  } catch (error) {
    deadlines = { status: "error", message: describeError(error) };
  }

  render();
};

const loadWeather = async (): Promise<void> => {
  weather = { status: "loading" };
  render();

  try {
    weather = { status: "success", data: await fetchWeather() };
  } catch (error) {
    weather = { status: "error", message: describeError(error) };
  }

  render();
};

function render(): void {
  root.render(
    <StrictMode>
      <App
        projects={projects}
        deadlines={deadlines}
        weather={weather}
        onRetryProjects={() => void loadProjects()}
        onRetryDeadlines={() => void loadDeadlines()}
      />
    </StrictMode>,
  );
}

render();
void loadProjects();
void loadDeadlines();
void loadWeather();
