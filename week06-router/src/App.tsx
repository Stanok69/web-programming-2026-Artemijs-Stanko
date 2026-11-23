import { Route, Routes } from "react-router";
import Layout from "./components/Layout";
import { isProjectList } from "./guards";
import { useLocalStorage } from "./hooks/useLocalStorage";
import DashboardPage from "./pages/DashboardPage";
import DeadlinesPage from "./pages/DeadlinesPage";
import NotFoundPage from "./pages/NotFoundPage";
import ProjectDetailsPage from "./pages/ProjectDetailsPage";
import ProjectsPage from "./pages/ProjectsPage";
import type { CurrentWeather, Deadline, LoadState, Project } from "./types";

const STORAGE_KEY = "campusflow.week06.localProjects";

interface AppProps {
  projects: LoadState<Project[]>;
  deadlines: LoadState<Deadline[]>;
  weather: LoadState<CurrentWeather>;
  onRetryProjects: () => void;
  onRetryDeadlines: () => void;
}

function withLocalProjects(
  state: LoadState<Project[]>,
  local: Project[],
): LoadState<Project[]> {
  if (state.status !== "success") {
    return state;
  }

  return { status: "success", data: [...state.data, ...local] };
}

function App({
  projects,
  deadlines,
  weather,
  onRetryProjects,
  onRetryDeadlines,
}: AppProps) {
  const [localProjects, setLocalProjects] = useLocalStorage<Project[]>(
    STORAGE_KEY,
    [],
    isProjectList,
  );

  const allProjects = withLocalProjects(projects, localProjects);

  const activeCountText =
    allProjects.status === "success"
      ? String(allProjects.data.filter((project) => project.status === "active").length)
      : allProjects.status === "loading"
        ? "…"
        : "–";

  function addProject(project: Project): void {
    setLocalProjects([...localProjects, project]);
  }

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route
          index
          element={
            <DashboardPage
              deadlines={deadlines}
              weather={weather}
              activeCountText={activeCountText}
              onRetryDeadlines={onRetryDeadlines}
            />
          }
        />
        <Route
          path="projects"
          element={
            <ProjectsPage
              projects={allProjects}
              onRetry={onRetryProjects}
              onAddProject={addProject}
            />
          }
        />
        <Route
          path="projects/:projectId"
          element={<ProjectDetailsPage projects={allProjects} onRetry={onRetryProjects} />}
        />
        <Route
          path="deadlines"
          element={<DeadlinesPage deadlines={deadlines} onRetry={onRetryDeadlines} />}
        />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
