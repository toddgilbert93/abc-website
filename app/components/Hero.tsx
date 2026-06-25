"use client";

import { useCallback, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import Nav from "./Nav";

export default function Hero() {
  const headingRef = useRef<HTMLHeadingElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLHeadingElement>) => {
    const el = headingRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
    el.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
  }, []);

  const handleMouseLeave = useCallback(() => {
    const el = headingRef.current;
    if (!el) return;
    el.style.setProperty("--mouse-x", "-200px");
    el.style.setProperty("--mouse-y", "50%");
  }, []);

  return (
    <section className="relative flex min-h-screen flex-col md:flex-row">
      <div className="absolute inset-x-0 top-0 z-20">
        <Nav />
      </div>

      {/* Left column — content */}
      <div className="flex flex-1 flex-col bg-background">
        <div className="flex flex-1 flex-col items-center justify-center gap-6 px-8 pb-20 pt-24 sm:px-12 lg:px-16 md:items-start">
          <h1
            ref={headingRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="hero-heading animate-fade-in-up max-w-xl text-center text-xl font-medium leading-snug tracking-tight text-foreground sm:text-2xl md:text-left md:text-3xl"
          >
            Build what should exist.
            <span className="hero-heading-glow" aria-hidden="true">
              Build what should exist.
            </span>
            <span className="hero-heading-rainbow" aria-hidden="true">
              Build what should exist.
            </span>
          </h1>

          <p className="animate-fade-in-up animation-delay-300 max-w-md text-center text-xs font-light leading-relaxed tracking-wide text-foreground/60 sm:text-sm md:text-left">
            Austin Build Club is a group of AI-native builders.
          </p>

          <div className="animate-fade-in-up animation-delay-600 mt-2 flex w-full max-w-xs flex-col items-center">
            <Link
              href="/join"
              className="lego lego-sm lego-coral hinge hinge-build relative z-10 text-sm font-bold tracking-tight"
            >
              Build
            </Link>
            <div className="-mt-5 flex w-full items-start justify-between max-[420px]:mt-5 max-[420px]:flex-wrap max-[420px]:justify-center max-[420px]:gap-x-2 max-[420px]:gap-y-5">
              <Link
                href="/about"
                className="lego lego-sm lego-cyan hinge hinge-about text-sm font-bold tracking-tight"
              >
                About
              </Link>
              <Link
                href="/contact"
                className="lego lego-sm lego-green hinge hinge-contact text-sm font-bold tracking-tight"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Right column — framed brickified image (md and up only) */}
      <div className="relative hidden flex-1 items-center justify-center overflow-hidden bg-background px-8 py-12 sm:p-12 md:flex">
        <div className="animate-float pointer-events-none absolute h-72 w-72 rounded-full bg-accent-cyan/20 blur-3xl" />
        <div className="relative w-full max-w-sm">
          <div className="relative aspect-[2/3] w-full overflow-hidden">
            <Image
              src="/bricks2.png"
              alt="The Austin skyline, brickified"
              fill
              sizes="(max-width: 768px) 90vw, 384px"
              className="object-cover"
              priority
              unoptimized
            />
          </div>
        </div>
      </div>
    </section>
  );
}
