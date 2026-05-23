"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
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

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-start pt-[30vh] px-6 text-center">
        <h1 className="animate-fade-in-up max-w-3xl font-[family-name:var(--font-geist-mono)] text-xl font-medium leading-snug tracking-tight text-white/85 sm:text-2xl md:text-3xl">
          Join your people.
          <br />
          Make something real.
        </h1>

        <p className="animate-fade-in-up animation-delay-300 mt-4 max-w-lg font-[family-name:var(--font-geist-mono)] text-xs font-light tracking-wide text-white/60 sm:text-sm">
          Austin Build Club is a group of developers, designers, and pms
          passionate about pushing AI to the limit.
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
