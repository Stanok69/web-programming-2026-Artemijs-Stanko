import type {
  Category,
  Deadline,
  DeadlineTone,
  LoadState,
  Project,
  ProjectStatus,
} from "./types";

const categoryBadge: Record<Category, string> = {
  Frontend: "bg-[#f0edff] text-[#6352ed]",
  API: "bg-[#eaf3ff] text-[#2f78d6]",
  JavaScript: "bg-[#e9f8f2] text-[#16875b]",
  Design: "bg-[#fff5de] text-[#aa7416]",
};

const categoryBar: Record<Category, string> = {
  Frontend: "bg-brand",
  API: "bg-[#3788ff]",
  JavaScript: "bg-[#1ca76f]",
  Design: "bg-[#c99a2e]",
};

const statusBadge: Record<ProjectStatus, string> = {
  active: "bg-[#eef6ff] text-[#3788ff]",
  done: "bg-[#edf9f4] text-[#1ca76f]",
};

const statusLabel: Record<ProjectStatus, string> = {
  active: "Active",
  done: "Done",
};

const deadlineTone: Record<DeadlineTone, string> = {
  urgent: "bg-[#fdeeee] text-[#c64444]",
  soon: "bg-[#fff5de] text-[#aa7416]",
  later: "bg-[#f1f3f6] text-[#6f7788]",
};

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const projectLoadingClass =
  "col-span-full rounded-[18px] border border-line bg-white p-6 text-center text-[13px] font-semibold text-muted";
const projectErrorClass =
  "col-span-full rounded-[18px] border border-[#f0d3d3] bg-[#fdf5f5] p-5 text-center";
const projectEmptyClass =
  "col-span-full rounded-[18px] border border-dashed border-line bg-white p-8 text-center";

const createElement = <K extends keyof HTMLElementTagNameMap>(
  tag: K,
  className: string,
  text?: string,
): HTMLElementTagNameMap[K] => {
  const element = document.createElement(tag);
  element.className = className;

  if (text !== undefined) {
    element.textContent = text;
  }

  return element;
};

const splitDate = (date: string): { day: string; month: string } => {
  const parts = date.split("-");
  const monthIndex = Number(parts[1]) - 1;
  const month = months[monthIndex];
  const day = Number(parts[2]);

  if (!month || Number.isNaN(day)) {
    return { day: date, month: "" };
  }

  return { day: String(day), month: month.toUpperCase() };
};

const formatDate = (date: string): string => {
  const { day, month } = splitDate(date);

  if (!month) {
    return date;
  }

  const readableMonth = month.charAt(0) + month.slice(1).toLowerCase();

  return `${readableMonth} ${day}`;
};

const createStatusBlock = (message: string, className: string): HTMLElement => {
  const block = createElement("div", className, message);
  block.setAttribute("role", "status");

  return block;
};

const createErrorBlock = (
  title: string,
  message: string,
  className: string,
  onRetry: () => void,
): HTMLElement => {
  const block = createElement("div", className);
  block.setAttribute("role", "alert");

  const retryButton = createElement(
    "button",
    "mt-3 rounded-[10px] bg-brand px-3.5 py-2 text-[11px] font-extrabold text-white transition hover:bg-brand-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2",
    "Try again",
  );
  retryButton.type = "button";
  retryButton.addEventListener("click", onRetry);

  block.append(
    createElement("strong", "block text-[13px] text-[#a33a3a]", title),
    createElement("p", "mt-1 text-[12px] text-[#8a5b5b]", message),
    retryButton,
  );

  return block;
};

const createEmptyProjects = (): HTMLElement => {
  const wrapper = createElement("div", projectEmptyClass);
  wrapper.append(
    createElement("strong", "text-sm", "No projects here yet"),
    createElement(
      "p",
      "mt-1.5 text-[12px] text-muted",
      "Try another filter or add a new project below.",
    ),
  );

  return wrapper;
};

const createEmptyDeadlines = (): HTMLElement =>
  createElement("p", "px-2 py-[14px] text-[13px] text-muted", "No upcoming deadlines.");

const createProjectCard = (project: Project, canDelete: boolean): HTMLElement => {
  const card = createElement(
    "article",
    "group rounded-[18px] border border-line bg-white p-[22px] transition duration-200 hover:-translate-y-1 hover:border-[#d5d9e6] hover:shadow-card",
  );
  card.dataset.status = project.status;
  card.dataset.projectId = project.id;

  const badges = createElement("div", "flex items-center justify-between gap-3");
  badges.append(
    createElement(
      "span",
      `inline-flex min-h-[25px] items-center rounded-full px-[9px] text-[10px] font-extrabold ${categoryBadge[project.category]}`,
      project.category,
    ),
    createElement(
      "span",
      `inline-flex min-h-[25px] items-center rounded-full px-[9px] text-[10px] font-extrabold ${statusBadge[project.status]}`,
      statusLabel[project.status],
    ),
  );

  const title = createElement("h3", "mt-6 mb-2 text-xl tracking-[-0.025em]", project.title);
  const description = createElement("p", "min-h-[66px] text-[13px] text-muted", project.description);

  const progressRow = createElement(
    "div",
    "mt-[22px] mb-2.5 flex items-center justify-between gap-3 text-[10px] font-bold text-muted",
  );
  const dueLabel =
    project.status === "done"
      ? `Submitted ${formatDate(project.dueDate)}`
      : `Due ${formatDate(project.dueDate)}`;
  progressRow.append(
    createElement("span", "", dueLabel),
    createElement("span", "", `${project.progress}% complete`),
  );

  const progressTrack = createElement(
    "div",
    "h-[7px] overflow-hidden rounded-full bg-[#eceef4]",
  );
  const progressFill = createElement(
    "div",
    `h-full rounded-[inherit] ${categoryBar[project.category]}`,
  );
  progressFill.style.width = `${project.progress}%`;
  progressTrack.append(progressFill);

  const link = createElement(
    "a",
    "inline-block rounded text-xs font-extrabold text-brand transition hover:text-brand-dark group-hover:translate-x-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2",
    project.status === "done" ? "View submission →" : "Open project →",
  );
  link.href = "#";

  const actions = createElement("div", "mt-[18px] flex items-center justify-between gap-3");
  actions.append(link);

  if (canDelete) {
    const deleteButton = createElement(
      "button",
      "rounded text-[11px] font-bold text-muted transition hover:text-[#c64444] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2",
      "Delete",
    );
    deleteButton.type = "button";
    deleteButton.dataset.action = "delete";
    deleteButton.setAttribute("aria-label", `Delete ${project.title}`);
    actions.append(deleteButton);
  }

  card.append(badges, title, description, progressRow, progressTrack, actions);

  return card;
};

export const renderProjects = (
  state: LoadState<Project[]>,
  container: HTMLElement,
  onRetry: () => void,
  localProjectIds: ReadonlySet<string>,
): void => {
  switch (state.status) {
    case "loading":
      container.replaceChildren(createStatusBlock("Loading projects…", projectLoadingClass));
      return;
    case "error":
      container.replaceChildren(
        createErrorBlock(
          "Projects could not be loaded.",
          state.message,
          projectErrorClass,
          onRetry,
        ),
      );
      return;
    case "success":
      if (state.data.length === 0) {
        container.replaceChildren(createEmptyProjects());
        return;
      }

      container.replaceChildren(
        ...state.data.map((project) => createProjectCard(project, localProjectIds.has(project.id))),
      );
      return;
    default: {
      const check: never = state;
      return check;
    }
  }
};

const createDeadlineRow = (deadline: Deadline): HTMLElement => {
  const row = createElement(
    "article",
    "grid grid-cols-[auto_1fr_auto] items-center gap-3.5 border-b border-line px-2 py-[14px] last:border-0 max-sm:grid-cols-[auto_1fr]",
  );

  const date = splitDate(deadline.date);
  const dateBox = createElement(
    "div",
    "grid size-[46px] min-h-[50px] place-content-center rounded-xl bg-[#f8fafc] text-center",
  );
  dateBox.append(
    createElement("strong", "text-[17px] leading-none", date.day),
    createElement("span", "mt-1 text-[9px] font-extrabold text-muted", date.month),
  );

  const info = createElement("div", "grid gap-[3px]");
  info.append(
    createElement("strong", "text-[13px]", deadline.title),
    createElement("span", "text-[11px] text-muted", `${deadline.course} · ${deadline.time}`),
  );

  const badge = createElement(
    "span",
    `inline-flex min-h-[25px] items-center rounded-full px-[9px] text-[10px] font-extrabold max-sm:col-start-2 max-sm:justify-self-start ${deadlineTone[deadline.tone]}`,
    deadline.label,
  );

  row.append(dateBox, info, badge);

  return row;
};

export const renderDeadlines = (
  state: LoadState<Deadline[]>,
  container: HTMLElement,
  onRetry: () => void,
): void => {
  switch (state.status) {
    case "loading":
      container.replaceChildren(
        createStatusBlock(
          "Loading deadlines…",
          "block px-2 py-[14px] text-[13px] font-semibold text-muted",
        ),
      );
      return;
    case "error":
      container.replaceChildren(
        createErrorBlock(
          "Deadlines could not be loaded.",
          state.message,
          "rounded-[13px] border border-[#f0d3d3] bg-[#fdf5f5] p-4 text-center",
          onRetry,
        ),
      );
      return;
    case "success":
      if (state.data.length === 0) {
        container.replaceChildren(createEmptyDeadlines());
        return;
      }

      container.replaceChildren(...state.data.map(createDeadlineRow));
      return;
    default: {
      const check: never = state;
      return check;
    }
  }
};
