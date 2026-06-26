import { HugeiconsIcon } from "@hugeicons/react";
import type { IconSvgElement } from "@hugeicons/react";

interface IconProps {
  /** A Hugeicons icon, e.g. `import { StarIcon } from "@hugeicons/core-free-icons"`. */
  icon: IconSvgElement;
  size?: number;
  /** Slightly chunky by default to sit friendly next to Balsamiq. */
  strokeWidth?: number;
  /** Colour comes from the text colour (currentColor) — use text-* utilities. */
  className?: string;
  "aria-label"?: string;
}

export function Icon({
  icon,
  size = 24,
  strokeWidth = 1.8,
  className = "text-foreground",
  ...rest
}: IconProps) {
  return (
    <HugeiconsIcon
      icon={icon}
      size={size}
      strokeWidth={strokeWidth}
      className={className}
      {...rest}
    />
  );
}
