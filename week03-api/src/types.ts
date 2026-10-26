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

export type LoadState<T> =
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "success"; data: T };
