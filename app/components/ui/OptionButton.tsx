interface OptionButtonProps {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}

export function OptionButton({
  selected,
  onClick,
  children,
  className = "",
}: OptionButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full rounded-xl border-2 px-4 py-3 text-left text-sm transition-all duration-200 ${
        selected
          ? "border-accent-cyan bg-accent-cyan/10 text-foreground"
          : "border-black/10 bg-white text-foreground/70 hover:border-accent-cyan/50 hover:scale-[1.01]"
      } ${className}`}
    >
      {children}
    </button>
  );
}
