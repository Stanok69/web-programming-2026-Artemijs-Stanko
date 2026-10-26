interface EmptyBoxProps {
  title: string;
  text: string;
  className?: string;
}

function EmptyBox({
  title,
  text,
  className = "rounded-[18px] border border-dashed border-line bg-white p-8 text-center",
}: EmptyBoxProps) {
  return (
    <div className={className}>
      <strong className="text-sm">{title}</strong>
      <p className="mt-1.5 text-[12px] text-muted">{text}</p>
    </div>
  );
}

export default EmptyBox;
