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
        <div className="flex flex-1 flex-col items-start justify-center gap-6 px-8 pb-20 pt-24 sm:px-12 lg:px-16">
          <h1
            ref={headingRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="hero-heading animate-fade-in-up max-w-xl text-xl font-medium leading-snug tracking-tight text-foreground sm:text-2xl md:text-3xl"
          >
            Inspire your peers.
            <br />
            Make something new.
            <span className="hero-heading-rainbow" aria-hidden="true">
              Inspire your peers.
              <br />
              Make something new.
            </span>
          </h1>

          <p className="animate-fade-in-up animation-delay-300 max-w-md text-xs font-light leading-relaxed tracking-wide text-foreground/60 sm:text-sm">
            Austin Build Club is a group of high-agency people pushing the
            limits of AI.
          </p>

          <div className="animate-fade-in-up animation-delay-600 mt-2">
            <Link
              href="/join"
              className="lego lego-green text-xs font-bold uppercase tracking-[0.2em]"
            >
              Join Us
            </Link>
          </div>
        </div>
      </div>

      {/* Right column — framed brickified image */}
      <div className="relative flex flex-1 items-center justify-center overflow-hidden bg-background px-8 py-12 sm:p-12">
        <div className="animate-float pointer-events-none absolute h-72 w-72 rounded-full bg-accent-cyan/20 blur-3xl" />
        <div className="relative w-full max-w-sm -rotate-1 rounded-xl bg-white p-3 shadow-[0_24px_60px_rgba(0,0,0,0.20)] ring-1 ring-black/10 transition-transform duration-300 hover:rotate-0">
          <div className="relative aspect-[2/3] w-full overflow-hidden rounded-md border border-black/10">
            <Image
              src="/brickify.png"
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
