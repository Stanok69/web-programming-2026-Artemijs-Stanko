import type { Deadline, Project } from "./types";

export const initialProjects: Project[] = [
  {
    id: "p-responsive-portfolio",
    title: "Responsive Portfolio",
    description:
      "Create a polished portfolio with reusable components and responsive layouts.",
    category: "Frontend",
    status: "active",
    dueDate: "2026-09-21",
    progress: 72,
  },
  {
    id: "p-weather-dashboard",
    title: "Weather Dashboard",
    description:
      "Fetch remote data, handle loading states, and present forecast information clearly.",
    category: "API",
    status: "active",
    dueDate: "2026-09-28",
    progress: 45,
  },
  {
    id: "p-task-manager",
    title: "Task Manager",
    description:
      "Build a small CRUD interface with filtering, local storage, and form validation.",
    category: "JavaScript",
    status: "done",
    dueDate: "2026-09-07",
    progress: 100,
  },
];

export const initialDeadlines: Deadline[] = [
  {
    id: "d-tailwind-migration",
    title: "Tailwind migration",
    course: "Web Programming",
    date: "2026-09-18",
    time: "23:59",
    label: "2 days",
    tone: "urgent",
  },
  {
    id: "d-portfolio-checkpoint",
    title: "Portfolio checkpoint",
    course: "Web Programming",
    date: "2026-09-21",
    time: "18:00",
    label: "5 days",
    tone: "soon",
  },
  {
    id: "d-weather-dashboard",
    title: "Weather Dashboard",
    course: "Web Programming",
    date: "2026-09-28",
    time: "23:59",
    label: "12 days",
    tone: "later",
  },
];
