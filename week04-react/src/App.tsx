import Announcement from "./components/Announcement";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Resources from "./components/Resources";
import SectionHeading from "./components/SectionHeading";
import StatCard from "./components/StatCard";
import type { CurrentWeather, Deadline, LoadState, Project } from "./types";

interface AppProps {
  projects: LoadState<Project[]>;
  deadlines: LoadState<Deadline[]>;
  weather: LoadState<CurrentWeather>;
  onRetryProjects: () => void;
  onRetryDeadlines: () => void;
}

function App({ projects, deadlines, weather }: AppProps) {
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
            <StatCard
              index="04"
              label="Rīga now"
              value={
                weather.status === "success"
                  ? `${Math.round(weather.data.temperature)}°C`
                  : weather.status === "loading"
                    ? "…"
                    : "–"
              }
              note={
                weather.status === "success"
                  ? `${Math.round(weather.data.windSpeed)} km/h`
                  : weather.status === "error"
                    ? "Weather unavailable"
                    : "Loading weather…"
              }
              tone={weather.status === "error" ? "danger" : "neutral"}
            />
          </div>
        </section>

        <section
          id="projects"
          className="mx-auto w-full max-w-[1180px] px-5 pt-[34px] pb-4 max-sm:px-3.5"
        >
          <SectionHeading
            eyebrow="PROJECTS"
            title="Current work"
            className="mb-5 flex items-center justify-between gap-6 max-sm:flex-col max-sm:items-stretch"
          >
            <div
              className="inline-flex gap-1 rounded-xl border border-line bg-white p-1 max-sm:w-full"
              role="group"
              aria-label="Project filters"
            >
              <button
                type="button"
                className="rounded-lg px-2.5 py-1.5 text-xs font-bold text-muted transition hover:bg-[#f0f2f7] hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 data-[active=true]:bg-[#f0f2f7] data-[active=true]:text-ink max-sm:flex-1"
                data-active="true"
                aria-pressed={true}
              >
                All
              </button>
              <button
                type="button"
                className="rounded-lg px-2.5 py-1.5 text-xs font-bold text-muted transition hover:bg-[#f0f2f7] hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 data-[active=true]:bg-[#f0f2f7] data-[active=true]:text-ink max-sm:flex-1"
                aria-pressed={false}
              >
                Active
              </button>
              <button
                type="button"
                className="rounded-lg px-2.5 py-1.5 text-xs font-bold text-muted transition hover:bg-[#f0f2f7] hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 data-[active=true]:bg-[#f0f2f7] data-[active=true]:text-ink max-sm:flex-1"
                aria-pressed={false}
              >
                Done
              </button>
            </div>
          </SectionHeading>

          <div className="grid grid-cols-1 gap-[18px] md:grid-cols-2 lg:grid-cols-3">
            <p className="col-span-full rounded-[18px] border border-line bg-white p-6 text-center text-[13px] font-semibold text-muted">
              {projects.status}
            </p>
          </div>
        </section>

        <section className="mx-auto grid w-full max-w-[1180px] gap-[18px] px-5 pt-[34px] pb-16 max-sm:px-3.5 min-[960px]:grid-cols-[1.45fr_0.75fr]">
          <section id="deadlines" className="rounded-[18px] border border-line bg-white p-6">
            <SectionHeading eyebrow="DEADLINES" title="Coming up">
              <a
                className="rounded text-xs font-extrabold text-brand transition hover:text-brand-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
                href="#"
              >
                See all
              </a>
            </SectionHeading>

            <div className="grid gap-1">
              <p className="px-2 py-[14px] text-[13px] text-muted">{deadlines.status}</p>
            </div>
          </section>

          <Resources />
        </section>
      </main>

      <Footer note="React components with typed props" />
    </>
  );
}

export default App;
