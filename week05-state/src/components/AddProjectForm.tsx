import { useState, type SubmitEvent } from "react";
import { categories } from "../types";
import { EMPTY_FORM } from "../validation";
import type { FieldName, FormValues } from "../validation";
import Field from "./Field";

interface AddProjectFormProps {
  disabled: boolean;
}

const inputClass =
  "w-full rounded-[10px] border border-line bg-white px-3 py-2.5 text-[13px] text-ink transition placeholder:text-muted/70 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20 aria-[invalid=true]:border-[#c64444]";

function AddProjectForm({ disabled }: AddProjectFormProps) {
  const [values, setValues] = useState<FormValues>(EMPTY_FORM);

  function update(name: FieldName, value: string): void {
    setValues((current) => ({ ...current, [name]: value }));
  }

  function handleSubmit(event: SubmitEvent<HTMLFormElement>): void {
    event.preventDefault();
  }

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
          <Field label="Title" htmlFor="projectTitle">
            <input
              className={inputClass}
              id="projectTitle"
              name="title"
              type="text"
              placeholder="Responsive Portfolio"
              value={values.title}
              onChange={(event) => update("title", event.target.value)}
            />
          </Field>

          <Field label="Category" htmlFor="projectCategory">
            <select
              className={inputClass}
              id="projectCategory"
              name="category"
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

          <Field label="Description" htmlFor="projectDescription" className="md:col-span-2">
            <textarea
              className={`${inputClass} min-h-[86px] resize-y`}
              id="projectDescription"
              name="description"
              placeholder="What should this project include?"
              value={values.description}
              onChange={(event) => update("description", event.target.value)}
            />
          </Field>

          <Field label="Due date" htmlFor="projectDueDate">
            <input
              className={inputClass}
              id="projectDueDate"
              name="dueDate"
              type="date"
              value={values.dueDate}
              onChange={(event) => update("dueDate", event.target.value)}
            />
          </Field>

          <Field label="Progress (%)" htmlFor="projectProgress">
            <input
              className={inputClass}
              id="projectProgress"
              name="progress"
              type="number"
              min="0"
              max="100"
              step="1"
              placeholder="0"
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
            onClick={() => setValues(EMPTY_FORM)}
          >
            Clear
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddProjectForm;
