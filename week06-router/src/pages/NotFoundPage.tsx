import { Link, useLocation } from "react-router";

function NotFoundPage() {
  const { pathname } = useLocation();

  return (
    <section className="mx-auto w-full max-w-[1180px] px-5 pt-16 pb-16 max-sm:px-3.5 max-sm:pt-10">
      <div className="rounded-[18px] border border-line bg-white p-8 text-center max-sm:p-6">
        <span className="block text-[11px] font-extrabold tracking-[0.14em] text-brand">404</span>
        <h1 className="mt-2 text-[clamp(30px,4vw,44px)] font-bold tracking-[-0.04em]">
          Page not found
        </h1>
        <p className="mx-auto mt-3 max-w-[520px] text-sm text-muted">
          There is nothing at <code className="rounded bg-[#f8fafc] px-1.5 py-0.5">{pathname}</code>
          . The address may be mistyped or the page may have moved.
        </p>
        <Link
          className="mt-6 inline-flex min-h-11 items-center justify-center rounded-xl bg-brand px-[18px] text-sm font-bold text-white shadow-[0_12px_24px_rgba(109,93,252,0.24)] transition duration-150 hover:-translate-y-px hover:bg-brand-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
          to="/"
        >
          Back to dashboard
        </Link>
      </div>
    </section>
  );
}

export default NotFoundPage;
