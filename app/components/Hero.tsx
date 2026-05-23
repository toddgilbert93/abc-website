"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import ShaderEffect from "./ShaderEffect";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (el) {
      el.classList.add("is-visible");
    }
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden bg-black"
    >
      {/* Shader Background */}
      <div className="absolute inset-x-0 bottom-0 z-0 h-full flex items-end">
        <div className="w-full">
          <ShaderEffect />
        </div>
      </div>

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
      <div className="relative z-10 flex h-full flex-col items-center justify-start pt-[22vh] px-6 text-center">
        <h1 className="animate-fade-in-up max-w-3xl font-[family-name:var(--font-geist-mono)] text-xl font-medium leading-snug tracking-tight text-white/85 sm:text-2xl md:text-3xl">
          Find your people.
          <br />
          Make something new.
        </h1>

        <p className="animate-fade-in-up animation-delay-300 mt-4 max-w-lg font-[family-name:var(--font-geist-mono)] text-xs font-light tracking-wide text-white/60 sm:text-sm">
          Austin Build Club is a group of developers, designers, and pms
          pushing AI to the limit.
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
    </section>
  );
}
