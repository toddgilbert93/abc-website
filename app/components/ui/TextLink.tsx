import Link from "next/link";

type TextLinkVariant = "default" | "muted";

interface TextLinkProps {
  href: string;
  variant?: TextLinkVariant;
  external?: boolean;
  /** When set, renders a native <a download> (for static files) instead of a Next.js Link. */
  download?: boolean | string;
  className?: string;
  children: React.ReactNode;
}

const variantClass: Record<TextLinkVariant, string> = {
  default:
    "link-squiggle text-foreground no-underline transition-colors hover:text-accent-cyan",
  muted:
    "text-foreground/40 text-xs uppercase tracking-[0.15em] transition-colors hover:text-accent-coral",
};

export function TextLink({
  href,
  variant = "default",
  external = false,
  download,
  className = "",
  children,
}: TextLinkProps) {
  const cls = `${variantClass[variant]} ${className}`;

  if (download !== undefined && download !== false) {
    return (
      <a href={href} download={download} className={cls}>
        {children}
      </a>
    );
  }

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
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
