import { isCategory } from "./types";
import type { Deadline, DeadlineTone, Project } from "./types";

export const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const isDeadlineTone = (value: unknown): value is DeadlineTone =>
  value === "urgent" || value === "soon" || value === "later";

export const isProject = (value: unknown): value is Project => {
  if (!isRecord(value)) {
    return false;
  }

  return (
    typeof value.id === "string" &&
    typeof value.title === "string" &&
    typeof value.description === "string" &&
    typeof value.category === "string" &&
    isCategory(value.category) &&
    (value.status === "active" || value.status === "done") &&
    typeof value.dueDate === "string" &&
    typeof value.progress === "number" &&
    Number.isInteger(value.progress) &&
    value.progress >= 0 &&
    value.progress <= 100
  );
};

export const isDeadline = (value: unknown): value is Deadline => {
  if (!isRecord(value)) {
    return false;
  }

  return (
    typeof value.id === "string" &&
    typeof value.title === "string" &&
    typeof value.course === "string" &&
    typeof value.date === "string" &&
    typeof value.time === "string" &&
    typeof value.label === "string" &&
    isDeadlineTone(value.tone)
  );
};
