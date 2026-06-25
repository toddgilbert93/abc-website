"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useCallback, useState } from "react";

export default function Nav() {
  const pathname = usePathname();
  const [twirling, setTwirling] = useState(false);

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      // On the home screen the click doesn't navigate anywhere — twirl instead.
      if (pathname === "/") {
        e.preventDefault();
        setTwirling(true);
      }
    },
    [pathname]
  );

  return (
    <nav className="relative z-20 flex items-center px-6 py-4 sm:px-10">
      <Link
        href="/"
        onClick={handleClick}
        className="block w-fit cursor-pointer transition-transform duration-200 hover:scale-110 hover:-rotate-3"
      >
        <Image
          src="/logo2.svg"
          alt="ABC"
          width={44}
          height={44}
          priority
          className={`block ${twirling ? "logo-twirl" : ""}`}
          onAnimationEnd={() => {
            setTwirling(false);
            // After the twirl, wipe the marker doodles.
            window.dispatchEvent(new Event("abc:clear-doodles"));
          }}
        />
      </Link>
    </nav>
  );
}
