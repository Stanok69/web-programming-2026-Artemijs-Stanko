import { isCategory } from "./types";
import type { Category, Project } from "./types";

export interface FormValues {
  title: string;
  description: string;
  category: string;
  dueDate: string;
  progress: string;
}

export type FieldName = keyof FormValues;

export type FormErrors = Partial<Record<FieldName, string>>;

export const EMPTY_FORM: FormValues = {
  title: "",
  description: "",
  category: "",
  dueDate: "",
  progress: "",
};

export type ValidationResult = { ok: true; project: Project } | { ok: false; errors: FormErrors };

const isIsoDate = (value: string): boolean =>
  /^\d{4}-\d{2}-\d{2}$/.test(value) && !Number.isNaN(Date.parse(value));

export function validate(values: FormValues): ValidationResult {
  const errors: FormErrors = {};

  const title = values.title.trim();
  const description = values.description.trim();
  const category: Category | null = isCategory(values.category) ? values.category : null;
  const dueDate = values.dueDate.trim();

  const rawProgress = values.progress.trim();
  const parsedProgress = rawProgress === "" ? null : Number(rawProgress);
  const progress =
    parsedProgress !== null &&
    Number.isInteger(parsedProgress) &&
    parsedProgress >= 0 &&
    parsedProgress <= 100
      ? parsedProgress
      : null;

  if (title.length < 3) {
    errors.title = "Title must be at least 3 characters.";
  }

  if (description.length < 10) {
    errors.description = "Description must be at least 10 characters.";
  } else if (description.length > 200) {
    errors.description = "Description must be 200 characters or fewer.";
  }

  if (category === null) {
    errors.category = "Choose a category.";
  }

  if (!isIsoDate(dueDate)) {
    errors.dueDate = "Choose a due date.";
  }

  if (progress === null) {
    errors.progress = "Progress must be a whole number from 0 to 100.";
  }

  if (category === null || progress === null || Object.keys(errors).length > 0) {
    return { ok: false, errors };
  }

  return {
    ok: true,
    project: {
      id: crypto.randomUUID(),
      title,
      description,
      category,
      status: progress === 100 ? "done" : "active",
      dueDate,
      progress,
    },
  };
}
