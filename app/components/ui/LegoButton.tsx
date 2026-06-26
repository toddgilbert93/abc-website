import Link from "next/link";

type LegoVariant = "cyan" | "coral" | "green";
type LegoSize = "default" | "sm";

interface LegoButtonProps {
  variant?: LegoVariant;
  size?: LegoSize;
  className?: string;
  children: React.ReactNode;
  href?: string;
  /** When set, renders a native <a download> (for static files) instead of a Next.js Link. */
  download?: boolean | string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

function classes(variant: LegoVariant, size: LegoSize, className: string) {
  return ["lego", `lego-${variant}`, size === "sm" && "lego-sm", className]
    .filter(Boolean)
    .join(" ");
}

export function LegoButton({
  variant = "cyan",
  size = "default",
  className = "",
  children,
  href,
  download,
  type = "button",
  disabled,
  onClick,
}: LegoButtonProps) {
  const cls = classes(variant, size, className);

  if (href !== undefined) {
    // A download (static file) needs a native anchor — Next's Link does client-side nav.
    if (download !== undefined && download !== false) {
      return (
        <a href={href} download={download} className={cls}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} disabled={disabled} onClick={onClick} className={cls}>
      {children}
    </button>
  );
}
