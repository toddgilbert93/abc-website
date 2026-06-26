# Austin Build Club — Design System

A whimsical, hand-built aesthetic in one file. Drop this whole document into your
AI coding session (paste it as context, or save it as `CLAUDE.md` / `.cursorrules`)
and tell the agent: **"use the ABC design system."**

It contains everything the agent needs: the vibe, the exact tokens, the complete
drop-in CSS, and the markup for every component. Works in any stack — plain HTML,
React, Vue, Svelte — because the core is just CSS.

> Want to see it first? Open **`showcase.html`** in a browser.

---

## The vibe

**Whimsical, hand-built, and playful — like a toy box, not a dashboard.** The
feeling is "smart software that doesn't take itself too seriously."

- **Warm cream paper**, never stark white backgrounds.
- **Three candy accents** — cyan, coral, green — used boldly and sparingly.
- **Glossy "lego-brick" buttons** with a chunky 3D drop shadow that depress when clicked.
- **Hand-drawn energy**: wavy squiggle underlines, gentle floating blobs, things that tilt a few degrees off-axis.
- **Rounded, friendly type** (Balsamiq Sans) — it looks marker-drawn.
- **Motion is soft and bouncy**, never slick or corporate. Always respect `prefers-reduced-motion`.

When in doubt: round the corners, add a little tilt, make it bouncy, keep it warm.

---

## Tokens

| Token | Value | Use |
|---|---|---|
| `--abc-background` | `#fffdf7` | Page background (warm cream) |
| `--abc-foreground` | `#1a1a1f` | Text / ink |
| `--abc-cyan` | `#07daff` | Accent — primary |
| `--abc-coral` | `#ff7b7f` | Accent — warm |
| `--abc-green` | `#53f686` | Accent — go / success |

Button shadow + ink shades (darker tone of each accent): `--abc-cyan-shadow #05a3bf`,
`--abc-coral-shadow #d6555a`, `--abc-green-shadow #2fbf60`. Faded text uses the
foreground at reduced opacity (≈70% body, 50% labels, 40% captions).

**Font:** [Balsamiq Sans](https://fonts.google.com/specimen/Balsamiq+Sans),
weights 400 & 700. **Type scale** (rem / weight): heading `1.25rem`/500 ·
subhead `1.125rem`/500 · body `0.875rem`/300 · label `0.75rem` uppercase, wide
tracking. Headings use tight tracking (`-0.01em`); labels wide (`0.1em`+).
**Radii:** `8px` buttons, `12px` inputs/cards, `9999px` blobs.

---

## The stylesheet — copy this in

Save as a `.css` file and include it once (`<link>` in HTML, or `import "./abc.css"`
in React/Vue/Svelte), or paste into a `<style>` tag. **Copy it verbatim** — the
glossy gradient, the offset shadow, and the squiggle wave are precisely tuned and
are what make it look like ABC.

```css
/* Austin Build Club — drop-in theme. No build step, no framework. */
@import url("https://fonts.googleapis.com/css2?family=Balsamiq+Sans:wght@400;700&display=swap");

:root {
  --abc-background: #fffdf7;
  --abc-foreground: #1a1a1f;
  --abc-cyan: #07daff;
  --abc-coral: #ff7b7f;
  --abc-green: #53f686;
  --abc-cyan-shadow: #05a3bf;
  --abc-coral-shadow: #d6555a;
  --abc-green-shadow: #2fbf60;
  --abc-cyan-ink: #064554;
  --abc-coral-ink: #7a2125;
  --abc-green-ink: #11623a;
  --abc-font: "Balsamiq Sans", system-ui, sans-serif;
  --abc-radius: 8px;
  --abc-radius-lg: 12px;
}

body {
  background: var(--abc-background);
  color: var(--abc-foreground);
  font-family: var(--abc-font);
}

/* ===== Lego-brick buttons ===== */
.lego {
  display: inline-block;
  border: 2px solid var(--lego-shadow);
  border-bottom: none;
  border-radius: var(--abc-radius);
  padding: 0.8rem 1.6rem;
  font-family: var(--abc-font);
  font-weight: 700;
  font-size: 0.875rem;
  letter-spacing: -0.01em;
  line-height: 1;
  color: #0a1014;
  text-decoration: none;
  cursor: pointer;
  background:
    linear-gradient(
      120deg,
      rgba(255, 255, 255, 0.42) 0%,
      rgba(255, 255, 255, 0.06) 24%,
      rgba(255, 255, 255, 0) 56%,
      rgba(255, 255, 255, 0.1) 100%
    ),
    var(--lego-color);
  box-shadow: 0 7px 0 var(--lego-shadow), 0 10px 12px rgba(0, 0, 0, 0.22);
  transition: transform 0.08s ease, box-shadow 0.08s ease, filter 0.12s ease;
}
.lego:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 0 var(--lego-shadow), 0 14px 16px rgba(0, 0, 0, 0.24);
}
.lego:active {
  transform: translateY(5px);
  box-shadow: 0 2px 0 var(--lego-shadow), 0 3px 6px rgba(0, 0, 0, 0.22);
}
.lego:disabled,
.lego[aria-disabled="true"] {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}
.lego-cyan {
  --lego-color: var(--abc-cyan);
  --lego-shadow: var(--abc-cyan-shadow);
  color: var(--abc-cyan-ink);
}
.lego-coral {
  --lego-color: var(--abc-coral);
  --lego-shadow: var(--abc-coral-shadow);
  color: var(--abc-coral-ink);
}
.lego-green {
  --lego-color: var(--abc-green);
  --lego-shadow: var(--abc-green-shadow);
  color: var(--abc-green-ink);
}
.lego-sm {
  padding: 0.5rem 1rem;
  font-size: 0.75rem;
}

/* ===== Animated squiggle link ===== */
.link-squiggle {
  color: var(--abc-foreground);
  text-decoration: none;
  background-repeat: repeat-x;
  background-position: 0 100%;
  background-size: 16px 6px;
  padding-bottom: 5px;
  transition: color 0.12s ease;
}
.link-squiggle:hover {
  color: var(--abc-cyan);
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='6'%3E%3Cpath d='M0 4 Q4 1 8 4 T16 4' fill='none' stroke='%2307daff' stroke-width='1.6'/%3E%3C/svg%3E");
  animation: squiggle 1s linear infinite;
}
@keyframes squiggle {
  from { background-position-x: 0; }
  to { background-position-x: 16px; }
}

/* ===== Form controls ===== */
.abc-label {
  display: block;
  margin-bottom: 0.5rem;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: color-mix(in srgb, var(--abc-foreground) 50%, transparent);
}
.abc-input,
.abc-textarea {
  width: 100%;
  box-sizing: border-box;
  border: 2px solid rgba(0, 0, 0, 0.1);
  border-radius: var(--abc-radius-lg);
  background: #fff;
  padding: 0.75rem 1rem;
  font-family: var(--abc-font);
  font-size: 0.875rem;
  color: var(--abc-foreground);
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
}
.abc-input::placeholder,
.abc-textarea::placeholder { color: rgba(0, 0, 0, 0.3); }
.abc-input:focus,
.abc-textarea:focus {
  outline: none;
  border-color: var(--abc-cyan);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--abc-cyan) 30%, transparent);
}
.abc-textarea { resize: none; }

/* Selectable option card — toggle .is-selected */
.abc-option {
  display: block;
  width: 100%;
  box-sizing: border-box;
  text-align: left;
  border: 2px solid rgba(0, 0, 0, 0.1);
  border-radius: var(--abc-radius-lg);
  background: #fff;
  padding: 0.75rem 1rem;
  font-family: var(--abc-font);
  font-size: 0.875rem;
  color: color-mix(in srgb, var(--abc-foreground) 70%, transparent);
  cursor: pointer;
  transition: border-color 0.2s ease, background 0.2s ease, transform 0.2s ease;
}
.abc-option:hover {
  border-color: color-mix(in srgb, var(--abc-cyan) 50%, transparent);
  transform: scale(1.01);
}
.abc-option.is-selected,
.abc-option[aria-pressed="true"] {
  border-color: var(--abc-cyan);
  background: color-mix(in srgb, var(--abc-cyan) 10%, transparent);
  color: var(--abc-foreground);
}

.abc-checkbox {
  width: 1.25rem;
  height: 1.25rem;
  accent-color: var(--abc-green);
  cursor: pointer;
}

.abc-error {
  border: 1px solid color-mix(in srgb, var(--abc-coral) 40%, transparent);
  background: color-mix(in srgb, var(--abc-coral) 10%, transparent);
  border-radius: var(--abc-radius-lg);
  padding: 0.75rem 1rem;
  font-size: 0.875rem;
  color: #b3373c;
}

/* ===== Decorative floating blob ===== */
.abc-blob {
  position: absolute;
  width: 18rem;
  height: 18rem;
  border-radius: 9999px;
  filter: blur(64px);
  pointer-events: none;
  z-index: 0;
  animation: float 7s ease-in-out infinite;
}
.abc-blob-cyan { background: color-mix(in srgb, var(--abc-cyan) 20%, transparent); }
.abc-blob-coral { background: color-mix(in srgb, var(--abc-coral) 15%, transparent); }
.abc-blob-green { background: color-mix(in srgb, var(--abc-green) 15%, transparent); }

/* ===== Animations ===== */
@keyframes fade-in-up {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in-up { animation: fade-in-up 1.2s ease-out forwards; opacity: 0; }
.animation-delay-300 { animation-delay: 300ms; }
.animation-delay-600 { animation-delay: 600ms; }
.animation-delay-900 { animation-delay: 900ms; }

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-14px); }
}
.animate-float { animation: float 7s ease-in-out infinite; }

@keyframes step-enter {
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-step-enter { animation: step-enter 0.4s ease-out forwards; }

@media (prefers-reduced-motion: reduce) {
  .animate-fade-in-up,
  .animate-float,
  .animate-step-enter,
  .abc-blob { animation: none; }
  .link-squiggle:hover { animation: none; }
}
```

---

## Components — markup

### Lego button — `.lego`
The signature element. Glossy 3D brick that lifts on hover, presses down on click.
```html
<button class="lego lego-cyan">Cyan</button>
<button class="lego lego-coral">Coral</button>
<a class="lego lego-green" href="/join">Green</a>

<button class="lego lego-cyan lego-sm">Small</button>
<button class="lego lego-coral" disabled>Disabled</button>
```
Variants: `lego-cyan` · `lego-coral` · `lego-green`. Size: add `lego-sm`.
A few degrees of tilt is on-brand — e.g. `style="rotate:-3deg"`.

### Squiggle link — `.link-squiggle`
No underline at rest; on hover a hand-drawn wave wiggles underneath in cyan.
```html
<a class="link-squiggle" href="#">Read the full story</a>
```

### Label — `.abc-label`
```html
<label class="abc-label">Full Name *</label>
```

### Input / textarea — `.abc-input` / `.abc-textarea`
```html
<input class="abc-input" type="text" placeholder="Your name" />
<textarea class="abc-textarea" rows="4" placeholder="What's on your mind?"></textarea>
```

### Option card — `.abc-option`
Selectable button-card for single or multi-select. Toggle `.is-selected`.
```html
<button class="abc-option is-selected">I regularly ship AI software</button>
<button class="abc-option">I'm new but excited to start</button>
```

### Checkbox — `.abc-checkbox`
```html
<label style="display:flex; gap:.5rem; align-items:center;">
  <input class="abc-checkbox" type="checkbox" />
  <span>I currently live in Austin</span>
</label>
```

### Error banner — `.abc-error`
```html
<div class="abc-error">Something went wrong. Please try again.</div>
```

### Floating blob — `.abc-blob`
Decorative out-of-focus orb that drifts. Place behind content in a
`position:relative` container.
```html
<div class="abc-blob abc-blob-cyan" style="top:-2rem; right:-4rem;"></div>
```

---

## Motion

| Class | Effect |
|---|---|
| `.animate-fade-in-up` | Fade + rise on entry (1.2s). Add `.animation-delay-300/600/900` to stagger. |
| `.animate-float` | Gentle 7s vertical drift (used by blobs). |
| `.animate-step-enter` | Quick rise for multi-step / swapped content (0.4s). |

All motion is disabled under `prefers-reduced-motion`.

---

## Icons

Use **[Hugeicons](https://hugeicons.com)** (free set) — its rounded stroke style
sits nicely next to Balsamiq. Give icons a slightly chunky stroke (~1.8) and let
them inherit text colour (`currentColor`) so they pick up the accents.

- **React:** `npm i @hugeicons/react @hugeicons/core-free-icons`
  ```jsx
  import { HugeiconsIcon } from "@hugeicons/react";
  import { RocketIcon } from "@hugeicons/core-free-icons";

  <HugeiconsIcon icon={RocketIcon} size={32} strokeWidth={1.8} />
  ```
- **Any stack:** grab the raw SVGs from hugeicons.com and set `stroke="currentColor"`.

---

## Using it with Tailwind

The CSS above works alongside Tailwind untouched. If you also want utilities like
`bg-background` / `text-accent-cyan`, map the tokens into your theme:

```css
/* Tailwind v4 — in your globals.css */
@theme inline {
  --color-background: #fffdf7;
  --color-foreground: #1a1a1f;
  --color-accent-cyan: #07daff;
  --color-accent-coral: #ff7b7f;
  --color-accent-green: #53f686;
}
```
