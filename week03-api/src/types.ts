export type ProjectStatus = "active" | "done";

export type ProjectFilter = ProjectStatus | "all";

export const categories = ["Frontend", "API", "JavaScript", "Design"] as const;

export type Category = (typeof categories)[number];

const categoryList: readonly string[] = categories;

export const isCategory = (value: string): value is Category => categoryList.includes(value);

export interface Project {
  id: string;
  title: string;
  description: string;
  category: Category;
  status: ProjectStatus;
  dueDate: string;
  progress: number;
}

export const isProject = (value: unknown): value is Project => {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const project = value as Record<string, unknown>;

  return (
    typeof project.id === "string" &&
    typeof project.title === "string" &&
    typeof project.description === "string" &&
    typeof project.category === "string" &&
    isCategory(project.category) &&
    (project.status === "active" || project.status === "done") &&
    typeof project.dueDate === "string" &&
    typeof project.progress === "number" &&
    Number.isInteger(project.progress) &&
    project.progress >= 0 &&
    project.progress <= 100
  );
};

export type DeadlineTone = "urgent" | "soon" | "later";

export interface Deadline {
  id: string;
  title: string;
  course: string;
  date: string;
  time: string;
  label: string;
  tone: DeadlineTone;
}
