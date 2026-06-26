interface ErrorMessageProps {
  children: React.ReactNode;
  className?: string;
}

export function ErrorMessage({ children, className = "" }: ErrorMessageProps) {
  return (
    <div
      className={`rounded-xl border border-accent-coral/40 bg-accent-coral/10 px-4 py-3 text-sm text-[#b3373c] ${className}`}
    >
      {children}
    </div>
  );
}
