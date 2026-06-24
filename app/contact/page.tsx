"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import Nav from "../components/Nav";
import { sendContactMessage } from "./actions";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  const handleSubmit = () => {
    setError(null);
    startTransition(async () => {
      const result = await sendContactMessage({ name, message });
      if (result.success) {
        setSent(true);
      } else {
        setError(result.error ?? "Something went wrong.");
      }
    });
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-background">
      {/* Whimsy: floating accent blob */}
      <div className="animate-float pointer-events-none absolute -left-20 top-48 -z-0 h-72 w-72 rounded-full bg-accent-coral/15 blur-3xl" />

      {/* Top Bar */}
      <Nav />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-xl px-6 pt-[12vh] pb-24">
        {sent ? (
          <div className="animate-fade-in-up text-center">
            <h1 className="text-lg font-medium tracking-tight text-foreground">
              Message sent.
            </h1>
            <p className="mt-4 text-sm font-light tracking-wide text-foreground/60">
              Thanks for reaching out — we&apos;ll get back to you soon.
            </p>
            <div className="mt-8">
              <Link
                href="/"
                className="lego lego-cyan text-xs font-bold uppercase tracking-[0.2em]"
              >
                Back to Home
              </Link>
            </div>
          </div>
        ) : (
          <div>
            <h1 className="animate-fade-in-up text-lg font-medium tracking-tight text-foreground sm:text-xl">
              Get in touch
            </h1>

            <div className="animate-fade-in-up animation-delay-300 mt-10 space-y-6">
              <div>
                <label className="mb-2 block text-xs uppercase tracking-widest text-foreground/50">
                  Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-xl border-2 border-black/10 bg-white px-4 py-3 text-sm text-foreground transition-colors placeholder:text-black/30 focus:border-accent-cyan focus:outline-none focus:ring-2 focus:ring-accent-cyan/30"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs uppercase tracking-widest text-foreground/50">
                  Message
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={5}
                  className="w-full resize-none rounded-xl border-2 border-black/10 bg-white px-4 py-3 text-sm text-foreground transition-colors placeholder:text-black/30 focus:border-accent-cyan focus:outline-none focus:ring-2 focus:ring-accent-cyan/30"
                  placeholder="What's on your mind?"
                />
              </div>
            </div>

            {error && (
              <div className="mt-4 rounded-xl border border-accent-coral/40 bg-accent-coral/10 px-4 py-3 text-sm text-[#b3373c]">
                {error}
              </div>
            )}

            <div className="animate-fade-in-up animation-delay-600 mt-10">
              <button
                onClick={handleSubmit}
                disabled={isPending}
                className="lego lego-green text-xs font-bold uppercase tracking-[0.2em]"
              >
                {isPending ? "Sending..." : "Send"}
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
