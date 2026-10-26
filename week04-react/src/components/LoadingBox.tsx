interface LoadingBoxProps {
  text: string;
  className?: string;
}

function LoadingBox({
  text,
  className = "px-2 py-[14px] text-[13px] font-semibold text-muted",
}: LoadingBoxProps) {
  return (
    <p role="status" className={className}>
      {text}
    </p>
  );
}

export default LoadingBox;
