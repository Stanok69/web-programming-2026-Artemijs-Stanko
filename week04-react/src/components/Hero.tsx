function Hero() {
  return (
    <section className="bg-[radial-gradient(circle_at_15%_10%,rgba(109,93,252,0.14),transparent_34%),radial-gradient(circle_at_85%_0%,rgba(55,136,255,0.10),transparent_28%)] pt-16 pb-12 max-sm:pt-[42px]">
      <div className="mx-auto grid w-full max-w-[1180px] items-center gap-14 px-5 max-md:gap-7 max-sm:px-3.5 min-[960px]:grid-cols-[1.4fr_0.8fr]">
        <div>
          <span className="mb-2.5 block text-[11px] font-extrabold tracking-[0.14em] text-brand">
            MONDAY WORKSPACE
          </span>
          <h1 className="max-w-[760px] text-[clamp(42px,6vw,72px)] leading-[0.98] font-bold tracking-[-0.055em] max-sm:text-[43px]">
            Build, learn, and ship{" "}
            <span className="bg-linear-to-r from-brand to-[#8a7dff] bg-clip-text text-transparent">
              something useful.
            </span>
          </h1>
          <p className="mt-6 max-w-[650px] text-lg text-muted max-sm:text-base">
            Track your current web-development tasks, upcoming deadlines, and project progress in
            one place.
          </p>
          <div className="mt-[30px] flex flex-wrap gap-3 max-sm:grid">
            <a
              className="inline-flex min-h-11 items-center justify-center rounded-xl bg-brand px-[18px] text-sm font-bold text-white shadow-[0_12px_24px_rgba(109,93,252,0.24)] transition duration-150 hover:-translate-y-px hover:bg-brand-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 max-sm:w-full"
              href="#projects"
            >
              View projects
            </a>
            <a
              className="inline-flex min-h-11 items-center justify-center rounded-xl border border-line bg-white px-[18px] text-sm font-bold transition duration-150 hover:-translate-y-px hover:shadow-[0_10px_24px_rgba(34,45,78,0.08)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 max-sm:w-full"
              href="#resources"
            >
              Open resources
            </a>
          </div>
        </div>

        <aside className="rounded-[22px] border border-white/60 bg-white/80 p-6 shadow-card backdrop-blur-md">
          <p className="mb-[18px] text-[13px] font-bold text-muted">This week</p>
          <div className="mb-2 flex items-center justify-between gap-4 text-[13px]">
            <span className="text-muted">Course progress</span>
            <strong>68%</strong>
          </div>
          <div className="h-[9px] overflow-hidden rounded-full bg-[#eceef4]">
            <div
              className="h-full rounded-[inherit] bg-linear-to-r from-brand to-[#8e80ff]"
              style={{ width: "68%" }}
            ></div>
          </div>
          <div className="mt-6 grid grid-cols-3 gap-3 max-sm:grid-cols-1">
            <div className="rounded-[14px] bg-[#f8fafc] px-2.5 py-4 text-center">
              <strong className="block text-[21px]">4</strong>
              <span className="mt-[3px] block text-[10px] text-muted">Open tasks</span>
            </div>
            <div className="rounded-[14px] bg-[#f8fafc] px-2.5 py-4 text-center">
              <strong className="block text-[21px]">2</strong>
              <span className="mt-[3px] block text-[10px] text-muted">Due soon</span>
            </div>
            <div className="rounded-[14px] bg-[#f8fafc] px-2.5 py-4 text-center">
              <strong className="block text-[21px]">7</strong>
              <span className="mt-[3px] block text-[10px] text-muted">Completed</span>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}

export default Hero;
