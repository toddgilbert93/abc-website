interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  children: React.ReactNode;
  className?: string;
}

export function Checkbox({
  checked,
  onChange,
  children,
  className = "",
}: CheckboxProps) {
  return (
    <label className={`flex cursor-pointer items-center gap-3 ${className}`}>
      <div
        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 transition-colors ${
          checked
            ? "border-accent-green bg-accent-green"
            : "border-black/20 bg-white"
        }`}
      >
        {checked && (
          <span className="text-xs font-bold text-[#0a1014]">✓</span>
        )}
      </div>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="hidden"
      />
      <span className="text-sm text-foreground/70">{children}</span>
    </label>
  );
}
