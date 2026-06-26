"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import Image from "next/image";
import Nav from "./Nav";
import { AccentBlob, LegoButton } from "./ui";
import { HERO_DOODLES, type DoodleStroke, type DoodleAnchor } from "./heroDoodles";
import { saveHeroDoodles } from "./saveDoodles";

const isDev = process.env.NODE_ENV === "development";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // Strokes drawn this session, on top of the saved defaults (normalized 0–1).
  const drawnRef = useRef<DoodleStroke[]>([]);
  const [saving, startSave] = useTransition();
  const [savedMsg, setSavedMsg] = useState<string | null>(null);

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

    let cssW = 1;
    let cssH = 1; // canvas CSS size, used to normalize/denormalize coordinates

    const applyInk = () => {
      ctx.fillStyle = INKS[ink];
      ctx.strokeStyle = INKS[ink];
      ctx.lineWidth = 1;
      ctx.lineJoin = "round";
      ctx.lineCap = "round";
      section.style.setProperty("--ink-cursor", CURSORS[ink]);
    };

    const wipe = () => {
      ctx.save();
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.restore();
    };

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

    const anchorEl = (a: DoodleAnchor | undefined): Element | null => {
      if (a === "heading") return section.querySelector(".hero-heading");
      if (a === "tower") return section.querySelector("[data-doodle-anchor='tower']");
      return null;
    };

    // The section-relative box a stroke's coords are normalized against.
    // null = the anchor element is missing or hidden (e.g. tower on mobile).
    const anchorBox = (a: DoodleAnchor | undefined) => {
      if (a === "heading" || a === "tower") {
        const el = anchorEl(a);
        if (!el) return null;
        const er = el.getBoundingClientRect();
        if (er.width === 0 || er.height === 0) return null;
        const sr = section.getBoundingClientRect();
        return { x: er.left - sr.left, y: er.top - sr.top, w: er.width, h: er.height };
      }
      return { x: 0, y: 0, w: cssW, h: cssH }; // canvas / legacy
    };

    // Draw a stroke, resolving its normalized points against its anchor's box.
    const drawStroke = (stroke: DoodleStroke) => {
      const box = anchorBox(stroke.anchor);
      if (!box) return; // anchor not currently on screen
      const pts = stroke.points;
      if (pts.length < 2) return;
      ctx.fillStyle = stroke.color;
      ctx.strokeStyle = stroke.color;
      const at = (p: [number, number]): [number, number] => [
        box.x + p[0] * box.w,
        box.y + p[1] * box.h,
      ];
      for (let i = 1; i < pts.length; i++) {
        const a = at(pts[i - 1]);
        const b = at(pts[i]);
        segment(a[0], a[1], b[0], b[1]);
      }
    };

    // Repaint everything: saved defaults, then this session's strokes.
    const redrawAll = () => {
      wipe();
      for (const s of HERO_DOODLES) drawStroke(s);
      for (const s of drawnRef.current) drawStroke(s);
      applyInk(); // restore live-drawing ink after the colour changes above
    };

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const r = section.getBoundingClientRect();
      cssW = r.width;
      cssH = r.height;
      canvas.width = Math.round(r.width * dpr);
      canvas.height = Math.round(r.height * dpr);
      canvas.style.width = `${r.width}px`;
      canvas.style.height = `${r.height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      redrawAll(); // resizing the canvas clears it, so repaint
    };
    resize();
    window.addEventListener("resize", resize);
    // Anchor positions shift once the web font and tower image settle, so
    // repaint when those land.
    window.addEventListener("load", redrawAll);
    document.fonts?.ready.then(() => redrawAll());

    // Logo click (after its twirl) resets to the saved default doodles.
    const clear = () => {
      drawnRef.current = [];
      redrawAll();
    };
    window.addEventListener("abc:clear-doodles", clear);

    const toLocal = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      return { x: e.clientX - r.left, y: e.clientY - r.top };
    };

    // Everywhere except the buttons and the logo (all links).
    const overBackground = (t: EventTarget | null) =>
      t instanceof Element && !t.closest("a, button, [data-no-draw]");

    const norm = (q: { x: number; y: number }): [number, number] => [
      q.x / cssW,
      q.y / cssH,
    ];

    const CLICK = 5; // movement (px) below which a press counts as a click
    let down: { x: number; y: number } | null = null;
    let last: { x: number; y: number } | null = null;
    let drawing = false;
    let current: DoodleStroke | null = null; // stroke being recorded

    const onDown = (e: PointerEvent) => {
      if (e.pointerType === "touch" || e.button !== 0) return;
      if (!overBackground(e.target)) return;
      e.preventDefault(); // stop native image-drag / text selection
      down = toLocal(e);
      last = down;
      drawing = false;
      current = null;
    };
    const onMove = (e: PointerEvent) => {
      if (!down || !last) return;
      const p = toLocal(e);
      if (!drawing) {
        const dx = p.x - down.x;
        const dy = p.y - down.y;
        if (dx * dx + dy * dy < CLICK * CLICK) return;
        drawing = true;
        current = { color: INKS[ink], anchor: "canvas", points: [norm(down), norm(p)] };
        drawnRef.current.push(current);
      } else if (current) {
        current.points.push(norm(p));
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
      current = null;
    };

    section.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("load", redrawAll);
      window.removeEventListener("abc:clear-doodles", clear);
      section.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, []);

  // Dev-only: tie each stroke to the nearest anchor element (by measuring live
  // positions), then write them into heroDoodles.ts as the new default.
  const handleSave = () => {
    const section = sectionRef.current;
    if (!section) return;
    setSavedMsg(null);

    const sr = section.getBoundingClientRect();
    const W = sr.width;
    const H = sr.height;

    type Box = { x: number; y: number; w: number; h: number };
    const boxOf = (selector: string): Box | null => {
      const el = section.querySelector(selector);
      if (!el) return null;
      const er = el.getBoundingClientRect();
      if (er.width === 0 || er.height === 0) return null; // hidden
      return { x: er.left - sr.left, y: er.top - sr.top, w: er.width, h: er.height };
    };

    const anchors: { id: DoodleAnchor; box: Box }[] = [];
    const heading = boxOf(".hero-heading");
    const tower = boxOf("[data-doodle-anchor='tower']");
    if (heading) anchors.push({ id: "heading", box: heading });
    if (tower) anchors.push({ id: "tower", box: tower });

    // Distance from a point to the nearest edge of a box (0 if inside).
    const distToBox = (px: number, py: number, b: Box) => {
      const dx = Math.max(b.x - px, 0, px - (b.x + b.w));
      const dy = Math.max(b.y - py, 0, py - (b.y + b.h));
      return Math.hypot(dx, dy);
    };

    // Re-tie a canvas/legacy stroke to whichever anchor it sits nearest.
    // Strokes already bound to an element are left untouched.
    const anchorStroke = (s: DoodleStroke): DoodleStroke => {
      if (s.anchor === "heading" || s.anchor === "tower") return s;
      const px = s.points.map(([x, y]) => [x * W, y * H] as [number, number]);
      if (!anchors.length) return { ...s, anchor: "canvas" };
      const cx = px.reduce((a, p) => a + p[0], 0) / px.length;
      const cy = px.reduce((a, p) => a + p[1], 0) / px.length;
      let best = anchors[0];
      let bestD = distToBox(cx, cy, best.box);
      for (let i = 1; i < anchors.length; i++) {
        const d = distToBox(cx, cy, anchors[i].box);
        if (d < bestD) {
          bestD = d;
          best = anchors[i];
        }
      }
      const b = best.box;
      return {
        color: s.color,
        anchor: best.id,
        points: px.map(([x, y]) => [(x - b.x) / b.w, (y - b.y) / b.h] as [number, number]),
      };
    };

    const anchored = [...HERO_DOODLES, ...drawnRef.current].map(anchorStroke);

    startSave(async () => {
      const res = await saveHeroDoodles(anchored);
      setSavedMsg(
        res.success
          ? `Saved ${res.count} strokes — reload to confirm`
          : res.error ?? "Save failed"
      );
    });
  };

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
            <LegoButton
              href="/join"
              variant="coral"
                           className="hinge hinge-build relative z-10 text-sm font-bold tracking-tight"
            >
              Build
            </LegoButton>
            <div className="-mt-5 flex w-full items-start justify-between max-[420px]:mt-5 max-[420px]:flex-wrap max-[420px]:justify-center max-[420px]:gap-x-2 max-[420px]:gap-y-5">
              <LegoButton
                href="/about"
                variant="cyan"
                               className="hinge hinge-about text-sm font-bold tracking-tight"
              >
                About
              </LegoButton>
              <LegoButton
                href="/contact"
                variant="green"
                               className="hinge hinge-contact text-sm font-bold tracking-tight"
              >
                Contact
              </LegoButton>
            </div>
          </div>
        </div>
      </div>

      {/* Right column — framed brickified image (md and up only) */}
      <div className="relative z-10 hidden flex-1 items-center justify-center overflow-hidden px-8 py-12 sm:p-12 md:flex">
        <AccentBlob color="cyan" />
        <div data-doodle-anchor="tower" className="relative w-full max-w-sm">
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

      {/* Dev-only: save the current doodles as the page default. */}
      {isDev && (
        <div
          data-no-draw
          className="fixed bottom-4 right-4 z-30 flex items-center gap-3"
        >
          {savedMsg && (
            <span className="rounded-md bg-foreground/80 px-2 py-1 text-xs text-background">
              {savedMsg}
            </span>
          )}
          <button
            data-no-draw
            onClick={handleSave}
            disabled={saving}
            className="lego lego-sm lego-cyan text-xs font-bold tracking-tight"
          >
            {saving ? "Saving…" : "Save as default"}
          </button>
        </div>
      )}
    </section>
  );
}
