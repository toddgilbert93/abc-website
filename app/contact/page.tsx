"use client";

import { useState, useTransition } from "react";
import Nav from "../components/Nav";
import { AccentBlob, ErrorMessage, Input, Label, LegoButton, Textarea } from "../components/ui";
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
      <AccentBlob color="coral" className="-left-20 top-48 -z-0" />

      <Nav />

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
              <LegoButton
                href="/"
                variant="cyan"
                className="text-xs font-bold uppercase tracking-[0.2em]"
              >
                Back to Home
              </LegoButton>
            </div>
          </div>
        ) : (
          <div>
            <h1 className="animate-fade-in-up text-lg font-medium tracking-tight text-foreground sm:text-xl">
              Get in touch
            </h1>

            <div className="animate-fade-in-up animation-delay-300 mt-10 space-y-6">
              <div>
                <Label>Name</Label>
                <Input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                />
              </div>

              <div>
                <Label>Message</Label>
                <Textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={5}
                  placeholder="What's on your mind?"
                />
              </div>
            </div>

            {error && <ErrorMessage className="mt-4">{error}</ErrorMessage>}

            <div className="animate-fade-in-up animation-delay-600 mt-10">
              <LegoButton
                variant="green"
                               disabled={isPending}
                onClick={handleSubmit}
                className="-rotate-3 text-sm font-bold tracking-tight"
              >
                {isPending ? "Sending..." : "Send"}
              </LegoButton>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
