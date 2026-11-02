interface FooterProps {
  note: string;
}

function Footer({ note }: FooterProps) {
  return (
    <footer className="border-t border-line bg-white">
      <div className="mx-auto flex min-h-[74px] w-full max-w-[1180px] items-center justify-between gap-5 px-5 text-[11px] text-muted max-sm:flex-col max-sm:items-start max-sm:px-3.5 max-sm:py-[18px]">
        <span>CampusFlow · Web Programming</span>
        <span>{note}</span>
      </div>
    </footer>
  );
}

export default Footer;
