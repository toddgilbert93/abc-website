"use client";

import { useState } from "react";
import Image from "next/image";
import {
  ArrowRight01Icon,
  ArrowUpRight01Icon,
  Download01Icon,
  HeartIcon,
  Idea01Icon,
  PencilEdit01Icon,
  SourceCodeIcon,
  SparklesIcon,
  StarIcon,
  Tick01Icon,
  Wrench01Icon,
} from "@hugeicons/core-free-icons";
import type { IconSvgElement } from "@hugeicons/react";
import {
  AccentBlob,
  Checkbox,
  ErrorMessage,
  Icon,
  Input,
  Label,
  LegoButton,
  OptionButton,
  Textarea,
  TextLink,
} from "../components/ui";

const ICON_SAMPLES: { icon: IconSvgElement; label: string }[] = [
  { icon: SourceCodeIcon, label: "SourceCode" },
  { icon: Idea01Icon, label: "Idea01" },
  { icon: Wrench01Icon, label: "Wrench01" },
  { icon: SparklesIcon, label: "Sparkles" },
  { icon: StarIcon, label: "Star" },
  { icon: HeartIcon, label: "Heart" },
  { icon: Tick01Icon, label: "Tick01" },
  { icon: PencilEdit01Icon, label: "PencilEdit01" },
  { icon: ArrowRight01Icon, label: "ArrowRight01" },
];

// ─── Section wrapper ────────────────────────────────────────────────────────
function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-black/8 pt-10">
      <p className="mb-6 text-xs uppercase tracking-[0.2em] text-foreground/30">
        {title}
      </p>
      {children}
    </section>
  );
}

// ─── Color swatch ───────────────────────────────────────────────────────────
function Swatch({
  bg,
  label,
  hex,
  dark,
}: {
  bg: string;
  label: string;
  hex: string;
  dark?: boolean;
}) {
  return (
    <div className="flex flex-col gap-2">
      <div
        className={`h-16 w-full rounded-xl border border-black/8 ${bg}`}
      />
      <p className={`text-xs font-medium ${dark ? "text-white" : "text-foreground"}`}>
        {label}
      </p>
      <p className="text-xs text-foreground/40">{hex}</p>
    </div>
  );
}

export default function DesignPage() {
  const [checkedA, setCheckedA] = useState(false);
  const [checkedB, setCheckedB] = useState(true);
  const [selected, setSelected] = useState<string | null>("option-b");
  const [inputVal, setInputVal] = useState("");
  const [textareaVal, setTextareaVal] = useState("");

  return (
    <main className="relative min-h-screen overflow-hidden bg-background">
      <AccentBlob color="cyan" className="-right-32 -top-16 -z-0 opacity-40" />

      <div className="relative z-10 mx-auto max-w-3xl space-y-10 px-6 py-16 pb-32 sm:px-10">
        {/* Header */}
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-xl font-medium tracking-tight text-foreground">
              Design System
            </h1>
            <p className="mt-2 text-sm font-light text-foreground/50">
              Austin Build Club — tokens, type, and components.
            </p>
          </div>
          <LegoButton
            href="/DESIGN_SYSTEM.md"
            download="DESIGN_SYSTEM.md"
            variant="green"
            size="sm"
            className="-rotate-2 text-xs font-bold tracking-tight"
          >
            Download .md
          </LegoButton>
        </div>

        {/* ─── Logo ───────────────────────────────────────────────────── */}
        <Section title="Logo">
          <div className="flex flex-wrap items-end gap-8">
            <div className="flex flex-col items-center gap-2">
              <Image src="/logo2.svg" alt="ABC logo" width={64} height={64} />
              <p className="text-xs text-foreground/40">64px</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Image src="/logo2.svg" alt="ABC logo" width={44} height={44} />
              <p className="text-xs text-foreground/40">44px — nav</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Image src="/logo2.svg" alt="ABC logo" width={32} height={32} />
              <p className="text-xs text-foreground/40">32px</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Image src="/logo2.svg" alt="ABC logo" width={24} height={24} />
              <p className="text-xs text-foreground/40">24px</p>
            </div>
          </div>
          <div className="mt-6">
            <TextLink href="/logo2.svg" download="abc-logo.svg" variant="muted">
              <span className="inline-flex items-center gap-1">
                Download SVG
                <Icon icon={Download01Icon} size={14} className="" />
              </span>
            </TextLink>
          </div>
        </Section>

        {/* ─── Colors ─────────────────────────────────────────────────── */}
        <Section title="Colors">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-5">
            <Swatch bg="bg-background border-2" label="background" hex="#fffdf7" />
            <Swatch bg="bg-foreground" label="foreground" hex="#1a1a1f" dark />
            <Swatch bg="bg-accent-cyan" label="accent-cyan" hex="#07daff" />
            <Swatch bg="bg-accent-coral" label="accent-coral" hex="#ff7b7f" />
            <Swatch bg="bg-accent-green" label="accent-green" hex="#53f686" />
          </div>

          <div className="mt-6 grid grid-cols-3 gap-4">
            <div className="flex flex-col gap-1">
              <p className="text-xs text-foreground/40">Cyan shadow</p>
              <div className="h-8 w-full rounded-lg" style={{ background: "#05a3bf" }} />
              <p className="text-xs text-foreground/40">#05a3bf</p>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-xs text-foreground/40">Coral shadow</p>
              <div className="h-8 w-full rounded-lg" style={{ background: "#d6555a" }} />
              <p className="text-xs text-foreground/40">#d6555a</p>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-xs text-foreground/40">Green shadow</p>
              <div className="h-8 w-full rounded-lg" style={{ background: "#2fbf60" }} />
              <p className="text-xs text-foreground/40">#2fbf60</p>
            </div>
          </div>
        </Section>

        {/* ─── Typography ─────────────────────────────────────────────── */}
        <Section title="Typography">
          <div className="space-y-4">
            <div className="flex items-baseline gap-4">
              <span className="w-40 shrink-0 text-xs text-foreground/30">
                text-xl / medium
              </span>
              <p className="text-xl font-medium tracking-tight text-foreground">
                Build what should exist.
              </p>
            </div>
            <div className="flex items-baseline gap-4">
              <span className="w-40 shrink-0 text-xs text-foreground/30">
                text-lg / medium
              </span>
              <p className="text-lg font-medium tracking-tight text-foreground">
                Austin Build Club
              </p>
            </div>
            <div className="flex items-baseline gap-4">
              <span className="w-40 shrink-0 text-xs text-foreground/30">
                text-sm / light
              </span>
              <p className="text-sm font-light leading-relaxed tracking-wide text-foreground/70">
                A group of AI-native builders in Austin, Texas.
              </p>
            </div>
            <div className="flex items-baseline gap-4">
              <span className="w-40 shrink-0 text-xs text-foreground/30">
                text-xs / label
              </span>
              <p className="text-xs uppercase tracking-widest text-foreground/50">
                Full Name *
              </p>
            </div>
            <div className="flex items-baseline gap-4">
              <span className="w-40 shrink-0 text-xs text-foreground/30">
                text-xs / eyebrow
              </span>
              <p className="text-xs uppercase tracking-[0.2em] text-foreground/40">
                Step 1 of 5
              </p>
            </div>
            <div className="flex items-baseline gap-4">
              <span className="w-40 shrink-0 text-xs text-foreground/30">
                text-xs / bold
              </span>
              <p className="text-xs font-bold uppercase tracking-[0.2em]">
                Back to Home
              </p>
            </div>
          </div>
        </Section>

        {/* ─── Buttons ─────────────────────────────────────────────────── */}
        <Section title="LegoButton">
          <div className="space-y-8">
            <div>
              <p className="mb-4 text-xs text-foreground/30">Default</p>
              <div className="flex flex-wrap gap-6">
                <LegoButton variant="cyan" className="text-sm font-bold tracking-tight">Cyan</LegoButton>
                <LegoButton variant="coral" className="text-sm font-bold tracking-tight">Coral</LegoButton>
                <LegoButton variant="green" className="text-sm font-bold tracking-tight">Green</LegoButton>
              </div>
            </div>
            <div>
              <p className="mb-4 text-xs text-foreground/30">Small</p>
              <div className="flex flex-wrap gap-6">
                <LegoButton variant="cyan" size="sm" className="text-xs font-bold tracking-tight">Cyan</LegoButton>
                <LegoButton variant="coral" size="sm" className="text-xs font-bold tracking-tight">Coral</LegoButton>
                <LegoButton variant="green" size="sm" className="text-xs font-bold tracking-tight">Green</LegoButton>
              </div>
            </div>
            <div>
              <p className="mb-4 text-xs text-foreground/30">With hinge animation</p>
              <div className="flex flex-wrap gap-6">
                <LegoButton
                  variant="coral"
                  className="hinge hinge-build text-sm font-bold tracking-tight"
                >
                  Build
                </LegoButton>
                <LegoButton
                  variant="cyan"
                  className="hinge hinge-about text-sm font-bold tracking-tight"
                >
                  About
                </LegoButton>
                <LegoButton
                  variant="green"
                  className="hinge hinge-contact text-sm font-bold tracking-tight"
                >
                  Contact
                </LegoButton>
              </div>
            </div>
            <div>
              <p className="mb-4 text-xs text-foreground/30">Disabled</p>
              <div className="flex flex-wrap items-start gap-6">
                <LegoButton variant="coral" disabled className="text-sm font-bold tracking-tight">
                  Disabled
                </LegoButton>
              </div>
            </div>
          </div>
        </Section>

        {/* ─── Icons (Hugeicons) ───────────────────────────────────────── */}
        <Section title="Icons — Hugeicons">
          <div className="space-y-8">
            <div>
              <p className="mb-4 text-xs text-foreground/30">
                Stroke — inherits text colour
              </p>
              <div className="flex flex-wrap gap-x-8 gap-y-6">
                {ICON_SAMPLES.map(({ icon, label }) => (
                  <div key={label} className="flex flex-col items-center gap-2">
                    <Icon icon={icon} size={32} />
                    <span className="text-xs text-foreground/40">{label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="mb-4 text-xs text-foreground/30">Accent colours</p>
              <div className="flex flex-wrap items-center gap-8">
                <Icon icon={SourceCodeIcon} size={40} className="text-accent-cyan" />
                <Icon icon={SparklesIcon} size={40} className="text-accent-coral" />
                <Icon icon={Idea01Icon} size={40} className="text-accent-green" />
                <Icon icon={StarIcon} size={28} />
                <Icon icon={StarIcon} size={48} />
              </div>
            </div>
          </div>
        </Section>

        {/* ─── TextLink ────────────────────────────────────────────────── */}
        <Section title="TextLink">
          <div className="space-y-4">
            <div className="flex items-baseline gap-6">
              <span className="w-20 shrink-0 text-xs text-foreground/30">default</span>
              <TextLink href="#">Read the full story</TextLink>
            </div>
            <div className="flex items-baseline gap-6">
              <span className="w-20 shrink-0 text-xs text-foreground/30">muted</span>
              <TextLink href="#" variant="muted">Back</TextLink>
            </div>
            <div className="flex items-baseline gap-6">
              <span className="w-20 shrink-0 text-xs text-foreground/30">external</span>
              <TextLink href="https://austinbuildclub.com" external>
                <span className="inline-flex items-center gap-1">
                  austinbuildclub.com
                  <Icon icon={ArrowUpRight01Icon} size={14} className="" />
                </span>
              </TextLink>
            </div>
          </div>
        </Section>

        {/* ─── Form inputs ─────────────────────────────────────────────── */}
        <Section title="Form">
          <div className="max-w-md space-y-6">
            <div>
              <Label>Full Name *</Label>
              <Input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder="Your name"
              />
            </div>
            <div>
              <Label>Message</Label>
              <Textarea
                value={textareaVal}
                onChange={(e) => setTextareaVal(e.target.value)}
                rows={4}
                placeholder="What's on your mind?"
              />
            </div>
          </div>
        </Section>

        {/* ─── Selection ───────────────────────────────────────────────── */}
        <Section title="Selection">
          <div className="space-y-8">
            <div className="max-w-md space-y-3">
              <p className="text-xs text-foreground/30">OptionButton</p>
              {["option-a", "option-b", "option-c"].map((v) => (
                <OptionButton
                  key={v}
                  selected={selected === v}
                  onClick={() => setSelected(v === selected ? null : v)}
                >
                  {v === "option-a" && "I regularly build and ship AI-powered software"}
                  {v === "option-b" && "I've built simple apps and prototypes with AI tools"}
                  {v === "option-c" && "I'm actively learning and experimenting"}
                </OptionButton>
              ))}
            </div>
            <div className="space-y-3">
              <p className="text-xs text-foreground/30">Checkbox</p>
              <Checkbox checked={checkedA} onChange={setCheckedA}>
                I currently live in the Austin Texas Metropolitan Area
              </Checkbox>
              <Checkbox checked={checkedB} onChange={setCheckedB}>
                Pre-checked example
              </Checkbox>
            </div>
          </div>
        </Section>

        {/* ─── Feedback ────────────────────────────────────────────────── */}
        <Section title="Feedback">
          <div className="max-w-md">
            <ErrorMessage>
              Something went wrong. Please check your details and try again.
            </ErrorMessage>
          </div>
        </Section>

        {/* ─── Animations ──────────────────────────────────────────────── */}
        <Section title="Animations">
          <div className="space-y-6 text-sm text-foreground/60">
            {[
              { cls: "animate-fade-in-up", label: "fade-in-up", desc: "1.2s ease-out — page entry" },
              { cls: "animate-float", label: "float", desc: "7s infinite — accent blobs" },
              { cls: "animate-step-enter", label: "step-enter", desc: "0.4s — multi-step form transitions" },
            ].map(({ cls, label, desc }) => (
              <div key={label} className="flex items-center gap-6">
                <code className="w-44 shrink-0 rounded-md bg-black/5 px-2 py-1 text-xs text-foreground/60">
                  .{label}
                </code>
                <div className={cls}>
                  <div className="h-8 w-8 rounded-lg bg-accent-cyan/60" />
                </div>
                <span className="text-xs text-foreground/40">{desc}</span>
              </div>
            ))}
          </div>
        </Section>

        {/* ─── AccentBlob ──────────────────────────────────────────────── */}
        <Section title="AccentBlob">
          <div className="grid grid-cols-3 gap-4">
            {(["cyan", "coral", "green"] as const).map((color) => (
              <div key={color} className="relative h-32 overflow-hidden rounded-xl border border-black/8 bg-white">
                <AccentBlob color={color} className="left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
                <p className="absolute bottom-3 left-0 right-0 text-center text-xs text-foreground/40">
                  {color}
                </p>
              </div>
            ))}
          </div>
        </Section>
      </div>
    </main>
  );
}
