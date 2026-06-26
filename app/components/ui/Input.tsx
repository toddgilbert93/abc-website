interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const base =
  "w-full rounded-xl border-2 border-black/10 bg-white px-4 py-3 text-sm text-foreground transition-colors placeholder:text-black/30 focus:border-accent-cyan focus:outline-none focus:ring-2 focus:ring-accent-cyan/30";

export function Input({ className = "", ...props }: InputProps) {
  return <input className={`${base} ${className}`} {...props} />;
}
