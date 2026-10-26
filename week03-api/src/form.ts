import { isCategory } from "./types";
import type { Category, Project } from "./types";

type FieldName = "title" | "description" | "category" | "dueDate" | "progress";

interface ProjectFormValues {
  title: string;
  description: string;
  category: Category;
  dueDate: string;
  progress: number;
}

type ValidationResult =
  | { valid: true; values: ProjectFormValues }
  | { valid: false; errors: Partial<Record<FieldName, string>> };

const errorIds: Record<FieldName, string> = {
  title: "projectTitleError",
  description: "projectDescriptionError",
  category: "projectCategoryError",
  dueDate: "projectDueDateError",
  progress: "projectProgressError",
};

const fieldNames: FieldName[] = ["title", "description", "category", "dueDate", "progress"];

const readFieldValue = (form: HTMLFormElement, name: FieldName): string => {
  const field = form.elements.namedItem(name);

  if (
    field instanceof HTMLInputElement ||
    field instanceof HTMLTextAreaElement ||
    field instanceof HTMLSelectElement
  ) {
    return field.value;
  }

  return "";
};

const isIsoDate = (value: string): boolean =>
  /^\d{4}-\d{2}-\d{2}$/.test(value) && !Number.isNaN(Date.parse(value));

const validate = (form: HTMLFormElement): ValidationResult => {
  const errors: Partial<Record<FieldName, string>> = {};

  const title = readFieldValue(form, "title").trim();
  const description = readFieldValue(form, "description").trim();
  const rawCategory = readFieldValue(form, "category");
  const category = isCategory(rawCategory) ? rawCategory : null;
  const dueDate = readFieldValue(form, "dueDate").trim();

  const rawProgress = readFieldValue(form, "progress").trim();
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
    return { valid: false, errors };
  }

  return {
    valid: true,
    values: { title, description, category, dueDate, progress },
  };
};

const showErrors = (form: HTMLFormElement, errors: Partial<Record<FieldName, string>>): void => {
  fieldNames.forEach((name) => {
    const field = form.elements.namedItem(name);
    const errorText = errors[name] ?? "";
    const errorElement = document.querySelector<HTMLElement>(`#${errorIds[name]}`);

    if (
      field instanceof HTMLInputElement ||
      field instanceof HTMLTextAreaElement ||
      field instanceof HTMLSelectElement
    ) {
      field.setAttribute("aria-invalid", String(errorText !== ""));
    }

    if (errorElement !== null) {
      errorElement.textContent = errorText;
    }
  });
};

export const initProjectForm = (onSubmit: (project: Project) => void): void => {
  const form = document.querySelector<HTMLFormElement>("#projectForm");

  if (form === null) {
    return;
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const result = validate(form);

    if (!result.valid) {
      showErrors(form, result.errors);
      return;
    }

    const values = result.values;
    const project: Project = {
      id: crypto.randomUUID(),
      title: values.title,
      description: values.description,
      category: values.category,
      status: values.progress === 100 ? "done" : "active",
      dueDate: values.dueDate,
      progress: values.progress,
    };

    showErrors(form, {});
    form.reset();
    onSubmit(project);
  });

  form.addEventListener("input", (event) => {
    const target = event.target;

    if (!(target instanceof HTMLInputElement) &&
        !(target instanceof HTMLTextAreaElement) &&
        !(target instanceof HTMLSelectElement)) {
      return;
    }

    const field = fieldNames.find((name) => name === target.name);

    if (field === undefined) {
      return;
    }

    target.setAttribute("aria-invalid", "false");
    const errorElement = document.querySelector<HTMLElement>(`#${errorIds[field]}`);

    if (errorElement !== null) {
      errorElement.textContent = "";
    }
  });

  form.addEventListener("reset", () => {
    showErrors(form, {});
  });
};
