"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import Image from "next/image";
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
    <main className="min-h-screen bg-background">
      {/* Top Bar */}
      <nav className="flex items-center justify-between px-6 py-4 sm:px-10">
        <Link href="/" className="block">
          <Image
            src="/logo.svg"
            alt="ABC"
            width={120}
            height={48}
            priority
            className="opacity-80"
          />
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
      <div className="mx-auto max-w-xl px-6 pt-[12vh] pb-24">
        {sent ? (
          <div className="animate-fade-in-up text-center font-[family-name:var(--font-geist-mono)]">
            <h1 className="text-lg font-medium tracking-tight text-white/85">
              Message sent.
            </h1>
            <p className="mt-4 text-sm font-light tracking-wide text-white/50">
              Thanks for reaching out — we&apos;ll get back to you soon.
            </p>
            <div className="mt-8">
              <Link
                href="/"
                className="inline-block border border-white/30 bg-white/10 px-8 py-3 text-xs font-medium uppercase tracking-[0.2em] text-white backdrop-blur-sm transition-all duration-300 hover:border-white/60 hover:bg-white/20"
              >
                Back to Home
              </Link>
            </div>
          </div>
        ) : (
          <div className="font-[family-name:var(--font-geist-mono)]">
            <h1 className="animate-fade-in-up text-lg font-medium tracking-tight text-white/85 sm:text-xl">
              Get in touch
            </h1>

            <div className="animate-fade-in-up animation-delay-300 mt-10 space-y-6">
              <div>
                <label className="mb-2 block text-xs uppercase tracking-widest text-white/50">
                  Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border border-white/20 bg-transparent px-4 py-3 text-sm text-white transition-colors placeholder:text-white/30 focus:border-white/50 focus:outline-none"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs uppercase tracking-widest text-white/50">
                  Message
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={5}
                  className="w-full resize-none border border-white/20 bg-transparent px-4 py-3 text-sm text-white transition-colors placeholder:text-white/30 focus:border-white/50 focus:outline-none"
                  placeholder="What's on your mind?"
                />
              </div>
            </div>

            {error && (
              <div className="mt-4 border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                {error}
              </div>
            )}

            <div className="animate-fade-in-up animation-delay-600 mt-10">
              <button
                onClick={handleSubmit}
                disabled={isPending}
                className="border border-white/30 bg-white/10 px-8 py-3 text-xs font-medium uppercase tracking-[0.2em] text-white backdrop-blur-sm transition-all duration-300 hover:border-white/60 hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-40"
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
