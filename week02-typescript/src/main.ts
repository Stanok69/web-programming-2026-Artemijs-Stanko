import "./style.css";
import { initialDeadlines, initialProjects } from "./data";
import { renderDeadlines, renderProjects } from "./render";

const projectGrid = document.querySelector<HTMLElement>("#projectGrid");
const deadlineList = document.querySelector<HTMLElement>("#deadlineList");

if (!projectGrid || !deadlineList) {
  throw new Error("Project or deadline container is missing in index.html");
}

renderProjects(initialProjects, projectGrid);
renderDeadlines(initialDeadlines, deadlineList);
