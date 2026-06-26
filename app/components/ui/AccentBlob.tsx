type BlobColor = "cyan" | "coral" | "green";

const colorClass: Record<BlobColor, string> = {
  cyan: "bg-accent-cyan/20",
  coral: "bg-accent-coral/15",
  green: "bg-accent-green/15",
};

interface AccentBlobProps {
  color?: BlobColor;
  className?: string;
}

export function AccentBlob({ color = "cyan", className = "" }: AccentBlobProps) {
  return (
    <div
      className={`animate-float pointer-events-none absolute h-72 w-72 rounded-full blur-3xl ${colorClass[color]} ${className}`}
    />
  );
}
