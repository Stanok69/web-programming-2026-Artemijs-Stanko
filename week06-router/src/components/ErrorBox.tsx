interface ErrorBoxProps {
  message: string;
  onRetry: () => void;
  className?: string;
}

function ErrorBox({
  message,
  onRetry,
  className = "rounded-[13px] border border-[#f0d3d3] bg-[#fdf5f5] p-4 text-center",
}: ErrorBoxProps) {
  return (
    <div role="alert" className={className}>
      <strong className="block text-[13px] text-[#a33a3a]">Could not load data.</strong>
      <p className="mt-1 text-[12px] text-[#8a5b5b]">{message}</p>
      <button
        type="button"
        className="mt-3 rounded-[10px] bg-brand px-3.5 py-2 text-[11px] font-extrabold text-white transition hover:bg-brand-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
        onClick={onRetry}
      >
        Try again
      </button>
    </div>
  );
}

export default ErrorBox;
