const links = [
  { index: "01", title: "Course repository", note: "Starter code and weekly tasks" },
  { index: "02", title: "Reference notes", note: "Quick examples and explanations" },
  { index: "03", title: "Submission guide", note: "Checklist before you submit" },
];

function Resources() {
  return (
    <aside id="resources" className="rounded-[18px] border border-line bg-white p-6">
      <p className="mb-2.5 text-[11px] font-extrabold tracking-[0.14em] text-brand">RESOURCES</p>
      <h2 className="text-[28px] font-bold tracking-[-0.035em]">Useful links</h2>
      <p className="mt-2 mb-[18px] text-[13px] text-muted">
        Keep these close while working through the project.
      </p>

      <div className="grid gap-2">
        {links.map((link) => (
          <a
            key={link.title}
            className="flex items-center gap-3 rounded-[13px] border border-line p-3 transition hover:border-[#cacfe0] hover:bg-[#f8fafc] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
            href="#"
          >
            <span className="grid size-[34px] shrink-0 place-items-center rounded-[10px] bg-brand-soft text-[10px] font-extrabold text-brand">
              {link.index}
            </span>
            <span className="grid gap-0.5">
              <strong className="text-xs">{link.title}</strong>
              <small className="text-[10px] text-muted">{link.note}</small>
            </span>
          </a>
        ))}
      </div>

      <div className="mt-[18px] rounded-[13px] border border-[#f3e4b6] bg-[#fff8e8] p-3.5">
        <strong className="text-[11px] text-[#9a6c16]">Tip</strong>
        <p className="mt-1 text-[11px] text-[#735d34]">
          Use browser DevTools while migrating the page. Compare computed styles before and after
          each change.
        </p>
      </div>
    </aside>
  );
}

export default Resources;
