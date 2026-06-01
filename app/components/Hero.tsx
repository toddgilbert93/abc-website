"use client";

import { useCallback, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import ShaderEffect from "./ShaderEffect";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (el) {
      el.classList.add("is-visible");
    }
  }, []);

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
    <section
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden bg-background"
    >
      {/* Shader Background */}
      <div className="absolute inset-x-0 bottom-0 z-0 h-full flex items-end mix-blend-lighten">
        <div className="w-full">
          <ShaderEffect />
        </div>
      </div>
      {/* Shader fade-in overlay */}
      <div className="absolute inset-0 z-[1] animate-shader-reveal bg-background pointer-events-none" />

      {/* Top Bar */}
      <nav className="relative z-20 flex items-center justify-between px-6 py-4 sm:px-10">
        <Link href="/" className="block">
          <Image src="/logo.svg" alt="ABC" width={120} height={48} priority className="opacity-80" />
        </Link>
        <div className="flex items-center gap-6">
          <Link
            href="/about"
            className="font-[family-name:var(--font-geist-mono)] text-xs uppercase tracking-[0.15em] text-white/60 transition-colors duration-200 hover:text-white"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="font-[family-name:var(--font-geist-mono)] text-xs uppercase tracking-[0.15em] text-white/60 transition-colors duration-200 hover:text-white"
          >
            Contact
          </Link>
        </div>
      </nav>

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-start pt-[15vh] px-6 text-center">
        <div className="px-10 py-10">
          <h1
            ref={headingRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="hero-heading animate-fade-in-up max-w-3xl font-[family-name:var(--font-geist-mono)] text-lg font-medium leading-snug tracking-tight text-white/85 sm:text-xl md:text-2xl"
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

          <p className="animate-fade-in-up animation-delay-300 mt-4 max-w-lg font-[family-name:var(--font-geist-mono)] text-xs font-light tracking-wide text-white/60 sm:text-sm">
            Austin Build Club is a group of high-agency people pushing the
            limits of AI.
          </p>

          <div className="animate-fade-in-up animation-delay-600 mt-8">
            <Link
              href="/join"
              className="inline-block border border-white/30 bg-white/10 px-8 py-3 font-[family-name:var(--font-geist-mono)] text-xs font-medium uppercase tracking-[0.2em] text-white backdrop-blur-sm transition-all duration-300 hover:border-white/60 hover:bg-white/20"
            >
              Join Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
