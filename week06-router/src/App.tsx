import { Route, Routes } from "react-router";
import Announcement from "./components/Announcement";
import DeadlineSection from "./components/DeadlineSection";
import Hero from "./components/Hero";
import Layout from "./components/Layout";
import ProjectSection from "./components/ProjectSection";
import Resources from "./components/Resources";
import SectionHeading from "./components/SectionHeading";
import StatCard from "./components/StatCard";
import WeatherCard from "./components/WeatherCard";
import { isProjectList } from "./guards";
import { useLocalStorage } from "./hooks/useLocalStorage";
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

  const activeProjects =
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
            <>
              <Announcement />
              <Hero />

              <section className="mx-auto w-full max-w-[1180px] px-5 pt-[34px] pb-4 max-sm:px-3.5">
                <SectionHeading
                  eyebrow="OVERVIEW"
                  title="Your workspace"
                  className="mb-5 flex items-end justify-between gap-6 max-sm:flex-col max-sm:items-start"
                >
                  <p className="max-w-[420px] text-sm text-muted max-sm:max-w-none">
                    A quick snapshot of what needs attention today.
                  </p>
                </SectionHeading>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  <StatCard
                    index="01"
                    label="Active projects"
                    value={activeProjects}
                    note="API + your projects"
                    tone="positive"
                  />
                  <StatCard
                    index="02"
                    label="Tasks completed"
                    value="18"
                    note="+6 this week"
                    tone="positive"
                  />
                  <StatCard index="03" label="Quiz average" value="84%" note="Last 4 quizzes" />
                  <WeatherCard weather={weather} />
                </div>
              </section>

              <ProjectSection projects={allProjects} onRetry={onRetryProjects} onAdd={addProject} />

              <section className="mx-auto grid w-full max-w-[1180px] gap-[18px] px-5 pt-[34px] pb-16 max-sm:px-3.5 min-[960px]:grid-cols-[1.45fr_0.75fr]">
                <DeadlineSection deadlines={deadlines} onRetry={onRetryDeadlines} />

                <Resources />
              </section>
            </>
          }
        />
        <Route path="projects" element={<ProjectsPage />} />
        <Route path="projects/:projectId" element={<ProjectDetailsPage />} />
        <Route path="deadlines" element={<DeadlinesPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
