interface HeaderProps {
  userName: string;
  userInitials: string;
  course: string;
}

function Header({ userName, userInitials, course }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-line/90 bg-white/90 backdrop-blur-md max-sm:relative">
      <div className="mx-auto flex min-h-[72px] w-full max-w-[1180px] items-center gap-7 px-5 max-sm:px-3.5">
        <a
          className="inline-flex items-center gap-2.5 rounded-lg font-extrabold tracking-[-0.02em] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
          href="#"
        >
          <span className="grid size-[38px] place-items-center rounded-xl bg-linear-to-br from-brand to-[#8a7dff] text-[13px] text-white shadow-[0_8px_20px_rgba(109,93,252,0.28)]">
            CF
          </span>
          <span>CampusFlow</span>
        </a>

        <button
          type="button"
          className="ml-auto grid size-[42px] place-items-center rounded-[10px] p-[9px] text-ink transition hover:bg-[#f1f3f8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 md:hidden"
          aria-label="Toggle navigation"
          aria-expanded="false"
          aria-controls="mainNav"
        >
          <span className="my-[5px] block h-0.5 w-full rounded-full bg-current"></span>
          <span className="my-[5px] block h-0.5 w-full rounded-full bg-current"></span>
          <span className="my-[5px] block h-0.5 w-full rounded-full bg-current"></span>
        </button>

        <nav
          id="mainNav"
          className="absolute inset-x-5 top-[72px] z-50 hidden flex-col gap-1 rounded-2xl border border-line bg-white p-2.5 shadow-card md:static md:inset-auto md:ml-[18px] md:flex md:flex-row md:items-center md:gap-1.5 md:border-0 md:bg-transparent md:p-0 md:shadow-none"
        >
          <a
            className="rounded-[10px] px-3 py-2.5 text-sm font-semibold text-muted transition hover:bg-[#f1f3f8] hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 data-[active=true]:bg-[#f1f3f8] data-[active=true]:text-ink"
            data-active="true"
            aria-current="page"
            href="#"
          >
            Dashboard
          </a>
          <a
            className="rounded-[10px] px-3 py-2.5 text-sm font-semibold text-muted transition hover:bg-[#f1f3f8] hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 data-[active=true]:bg-[#f1f3f8] data-[active=true]:text-ink"
            href="#projects"
          >
            Projects
          </a>
          <a
            className="rounded-[10px] px-3 py-2.5 text-sm font-semibold text-muted transition hover:bg-[#f1f3f8] hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 data-[active=true]:bg-[#f1f3f8] data-[active=true]:text-ink"
            href="#deadlines"
          >
            Deadlines
          </a>
          <a
            className="rounded-[10px] px-3 py-2.5 text-sm font-semibold text-muted transition hover:bg-[#f1f3f8] hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 data-[active=true]:bg-[#f1f3f8] data-[active=true]:text-ink"
            href="#resources"
          >
            Resources
          </a>
        </nav>

        <div className="flex items-center gap-2.5 md:ml-auto">
          <div className="grid size-[38px] place-items-center rounded-full bg-ink text-xs font-extrabold text-white">
            {userInitials}
          </div>
          <div className="grid gap-px max-sm:hidden">
            <strong className="text-[13px]">{userName}</strong>
            <span className="text-[11px] text-muted">{course}</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
