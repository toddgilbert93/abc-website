"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import Nav from "./Nav";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Whimsical chisel-tip marker. Click the background to toggle ink colour
  // (and cursor); drag to draw.
  useEffect(() => {
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const INKS = ["#07daff", "#53f686", "#ff7b7f"]; // blue, green, red
    const CURSORS = [
      'url("/marker-blue.svg") 6 34, crosshair',
      'url("/marker-green.svg") 6 34, crosshair',
      'url("/marker-red.svg") 6 34, crosshair',
    ];
    let ink = 0;

    const NIB = 16; // chisel width
    const ANGLE = (38 * Math.PI) / 180; // chisel tip angle
    const nx = (Math.cos(ANGLE) * NIB) / 2;
    const ny = (Math.sin(ANGLE) * NIB) / 2;

    const applyInk = () => {
      ctx.fillStyle = INKS[ink];
      ctx.strokeStyle = INKS[ink];
      ctx.lineWidth = 1;
      ctx.lineJoin = "round";
      ctx.lineCap = "round";
      section.style.setProperty("--ink-cursor", CURSORS[ink]);
    };

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const r = section.getBoundingClientRect();
      canvas.width = Math.round(r.width * dpr);
      canvas.height = Math.round(r.height * dpr);
      canvas.style.width = `${r.width}px`;
      canvas.style.height = `${r.height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      applyInk(); // resizing the canvas resets the 2d context state
    };
    resize();
    window.addEventListener("resize", resize);

    // Wipe the canvas — triggered when the logo is clicked (after its twirl).
    const clear = () => {
      ctx.save();
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.restore();
    };
    window.addEventListener("abc:clear-doodles", clear);

    const toLocal = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      return { x: e.clientX - r.left, y: e.clientY - r.top };
    };

    // Everywhere except the buttons and the logo (all links).
    const overBackground = (t: EventTarget | null) =>
      t instanceof Element && !t.closest("a, button, [data-no-draw]");

    const segment = (x0: number, y0: number, x1: number, y1: number) => {
      // Quad between the chisel nib at each point — width varies with direction.
      ctx.beginPath();
      ctx.moveTo(x0 + nx, y0 + ny);
      ctx.lineTo(x1 + nx, y1 + ny);
      ctx.lineTo(x1 - nx, y1 - ny);
      ctx.lineTo(x0 - nx, y0 - ny);
      ctx.closePath();
      ctx.fill();
      ctx.stroke(); // same-colour hairline closes the anti-aliased seams
    };

    const CLICK = 5; // movement (px) below which a press counts as a click
    let down: { x: number; y: number } | null = null;
    let last: { x: number; y: number } | null = null;
    let drawing = false;

    const onDown = (e: PointerEvent) => {
      if (e.pointerType === "touch" || e.button !== 0) return;
      if (!overBackground(e.target)) return;
      e.preventDefault(); // stop native image-drag / text selection
      down = toLocal(e);
      last = down;
      drawing = false;
    };
    const onMove = (e: PointerEvent) => {
      if (!down || !last) return;
      const p = toLocal(e);
      if (!drawing) {
        const dx = p.x - down.x;
        const dy = p.y - down.y;
        if (dx * dx + dy * dy < CLICK * CLICK) return;
        drawing = true;
      }
      segment(last.x, last.y, p.x, p.y);
      last = p;
    };
    const onUp = () => {
      if (down && !drawing) {
        ink = (ink + 1) % INKS.length; // a click cycles the ink colour
        applyInk();
      }
      down = null;
      last = null;
      drawing = false;
    };

    section.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("abc:clear-doodles", clear);
      section.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="hero-draw-zone relative flex min-h-screen select-none flex-col bg-background md:flex-row"
    >
      {/* Marker doodle canvas — sits behind the content */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
      />

      <div className="absolute inset-x-0 top-0 z-20">
        <Nav />
      </div>

      {/* Left column — content */}
      <div className="relative z-10 flex flex-1 flex-col">
        <div className="flex flex-1 flex-col items-center justify-center gap-6 px-8 pb-20 pt-24 sm:px-12 lg:px-16 md:items-start">
          <h1 className="hero-heading animate-fade-in-up max-w-xl text-center text-xl font-medium leading-snug tracking-tight text-foreground sm:text-2xl md:text-left md:text-3xl">
            Build what should exist.
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
      <div className="relative z-10 hidden flex-1 items-center justify-center overflow-hidden px-8 py-12 sm:p-12 md:flex">
        <div className="animate-float pointer-events-none absolute h-72 w-72 rounded-full bg-accent-cyan/20 blur-3xl" />
        <div className="relative w-full max-w-sm">
          <div className="relative aspect-[2/3] w-full overflow-hidden">
            <Image
              src="/lego-tower.png"
              alt="A tower built from Lego bricks"
              fill
              sizes="(max-width: 768px) 90vw, 384px"
              className="object-cover"
              draggable={false}
              priority
              unoptimized
            />
          </div>
        </div>
      </div>
    </section>
  );
}
