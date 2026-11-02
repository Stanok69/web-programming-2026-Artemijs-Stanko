import Announcement from "./components/Announcement";
import DeadlineSection from "./components/DeadlineSection";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import ProjectSection from "./components/ProjectSection";
import Resources from "./components/Resources";
import SectionHeading from "./components/SectionHeading";
import StatCard from "./components/StatCard";
import WeatherCard from "./components/WeatherCard";
import type { CurrentWeather, Deadline, LoadState, Project } from "./types";

interface AppProps {
  projects: LoadState<Project[]>;
  deadlines: LoadState<Deadline[]>;
  weather: LoadState<CurrentWeather>;
  onRetryProjects: () => void;
  onRetryDeadlines: () => void;
}

function App({
  projects,
  deadlines,
  weather,
  onRetryProjects,
  onRetryDeadlines,
}: AppProps) {
  const activeProjects =
    projects.status === "success"
      ? String(projects.data.filter((project) => project.status === "active").length)
      : projects.status === "loading"
        ? "…"
        : "–";

  return (
    <>
      <Header userName="Alex Student" userInitials="AZ" course="Web Programming" />

      <Announcement />

      <main>
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
              note="From your projects"
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

        <ProjectSection projects={projects} onRetry={onRetryProjects} />

        <section className="mx-auto grid w-full max-w-[1180px] gap-[18px] px-5 pt-[34px] pb-16 max-sm:px-3.5 min-[960px]:grid-cols-[1.45fr_0.75fr]">
          <DeadlineSection deadlines={deadlines} onRetry={onRetryDeadlines} />

          <Resources />
        </section>
      </main>

      <Footer note="React components with typed props" />
    </>
  );
}

export default App;
