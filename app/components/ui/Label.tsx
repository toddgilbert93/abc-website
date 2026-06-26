interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {}

export function Label({ className = "", children, ...props }: LabelProps) {
  return (
    <label
      className={`mb-2 block text-xs uppercase tracking-widest text-foreground/50 ${className}`}
      {...props}
    >
      {children}
    </label>
  );
}
