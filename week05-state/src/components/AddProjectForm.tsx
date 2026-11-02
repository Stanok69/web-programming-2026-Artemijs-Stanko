import { useState, type SubmitEvent } from "react";
import { categories } from "../types";
import type { Project } from "../types";
import { EMPTY_FORM, validate } from "../validation";
import type { FieldName, FormErrors, FormValues } from "../validation";
import Field from "./Field";

interface AddProjectFormProps {
  disabled: boolean;
  onAdd: (project: Project) => void;
}

const inputClass =
  "w-full rounded-[10px] border border-line bg-white px-3 py-2.5 text-[13px] text-ink transition placeholder:text-muted/70 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20 aria-[invalid=true]:border-[#c64444]";

function AddProjectForm({ disabled, onAdd }: AddProjectFormProps) {
  const [values, setValues] = useState<FormValues>(EMPTY_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [message, setMessage] = useState("");

  function update(name: FieldName, value: string): void {
    setValues((current) => ({ ...current, [name]: value }));
  }

  function handleSubmit(event: SubmitEvent<HTMLFormElement>): void {
    event.preventDefault();

    const result = validate(values);

    if (!result.ok) {
      setErrors(result.errors);
      setMessage("");
      return;
    }

    onAdd(result.project);
    setErrors({});
    setValues(EMPTY_FORM);
    setMessage(`"${result.project.title}" added.`);
  }

  const descriptionLength = values.description.length;

  return (
    <div id="add-project" className="pt-[14px] pb-10">
      <form
        className="rounded-[18px] border border-line bg-white p-6"
        noValidate
        onSubmit={handleSubmit}
      >
        <div className="mb-5">
          <p className="mb-2.5 text-[11px] font-extrabold tracking-[0.14em] text-brand">
            NEW PROJECT
          </p>
          <h2 className="text-[28px] font-bold tracking-[-0.035em]">Add a project</h2>
          <p className="mt-2 text-[13px] text-muted">
            New projects are stored in this browser and stay here after a reload.
          </p>
        </div>

        <div className="grid gap-[18px] md:grid-cols-2">
          <Field label="Title" htmlFor="projectTitle" error={errors.title}>
            <input
              className={inputClass}
              id="projectTitle"
              name="title"
              type="text"
              placeholder="Responsive Portfolio"
              aria-invalid={errors.title !== undefined}
              aria-describedby="projectTitleError"
              value={values.title}
              onChange={(event) => update("title", event.target.value)}
            />
          </Field>

          <Field label="Category" htmlFor="projectCategory" error={errors.category}>
            <select
              className={inputClass}
              id="projectCategory"
              name="category"
              aria-invalid={errors.category !== undefined}
              aria-describedby="projectCategoryError"
              value={values.category}
              onChange={(event) => update("category", event.target.value)}
            >
              <option value="">Choose…</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </Field>

          <Field
            label="Description"
            htmlFor="projectDescription"
            error={errors.description}
            className="md:col-span-2"
            hint={
              <p
                className={`text-[11px] font-semibold ${
                  descriptionLength > 200 ? "text-[#c64444]" : "text-muted"
                }`}
              >
                {descriptionLength}/200
              </p>
            }
          >
            <textarea
              className={`${inputClass} min-h-[86px] resize-y`}
              id="projectDescription"
              name="description"
              placeholder="What should this project include?"
              aria-invalid={errors.description !== undefined}
              aria-describedby="projectDescriptionError"
              value={values.description}
              onChange={(event) => update("description", event.target.value)}
            />
          </Field>

          <Field label="Due date" htmlFor="projectDueDate" error={errors.dueDate}>
            <input
              className={inputClass}
              id="projectDueDate"
              name="dueDate"
              type="date"
              aria-invalid={errors.dueDate !== undefined}
              aria-describedby="projectDueDateError"
              value={values.dueDate}
              onChange={(event) => update("dueDate", event.target.value)}
            />
          </Field>

          <Field label="Progress (%)" htmlFor="projectProgress" error={errors.progress}>
            <input
              className={inputClass}
              id="projectProgress"
              name="progress"
              type="number"
              min="0"
              max="100"
              step="1"
              placeholder="0"
              aria-invalid={errors.progress !== undefined}
              aria-describedby="projectProgressError"
              value={values.progress}
              onChange={(event) => update("progress", event.target.value)}
            />
          </Field>
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-3">
          <button
            className="rounded-[10px] bg-brand px-4 py-2.5 text-xs font-extrabold text-white transition hover:bg-brand-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:bg-brand"
            type="submit"
            disabled={disabled}
            title={disabled ? "Wait until the projects have loaded." : undefined}
          >
            Add project
          </button>
          <button
            className="rounded-[10px] border border-line px-4 py-2.5 text-xs font-extrabold text-muted transition hover:bg-[#f1f3f8] hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
            type="button"
            onClick={() => {
              setValues(EMPTY_FORM);
              setErrors({});
              setMessage("");
            }}
          >
            Clear
          </button>
        </div>

        <p
          className="mt-3 min-h-[16px] text-[12px] font-semibold text-[#16875b]"
          role="status"
        >
          {message}
        </p>
      </form>
    </div>
  );
}

export default AddProjectForm;
