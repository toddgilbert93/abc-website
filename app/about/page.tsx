import Link from "next/link";
import Nav from "../components/Nav";

export default function AboutPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-background">
      {/* Whimsy: floating accent blob */}
      <div className="animate-float pointer-events-none absolute -right-20 top-40 -z-0 h-72 w-72 rounded-full bg-accent-green/15 blur-3xl" />

      {/* Top Bar */}
      <Nav />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-2xl px-6 pt-[12vh] pb-24">
        <h1 className="animate-fade-in-up text-lg font-medium leading-snug tracking-tight text-foreground sm:text-xl">
          The future is uncertain.
          <br />
          Your role is unwritten.
        </h1>

        <div className="animate-fade-in-up animation-delay-300 mt-10 space-y-6 text-sm font-light leading-relaxed tracking-wide text-foreground/70">
          <p>
            Austin Build Club is a space for local talent to connect,
            collaborate, and create. Whether you are an experienced developer
            shipping complex systems, or a product marketer experimenting with
            process automation, we believe that everyone has something to
            offer, and we all have room to learn.
          </p>

          <p>
            There are two requirements to be a part of this community. One, you
            must live in Austin. And two, you must be always actively building
            something. Personal websites are fine, disposable tools are great,
            crazy concepts that fail are amazing.
          </p>

          <p>
            If this gets you excited, we look forward to meeting you :)
          </p>
        </div>

        <div className="animate-fade-in-up animation-delay-600 mt-10">
          <Link
            href="/join"
            className="lego lego-sm lego-green -rotate-3 text-sm font-bold tracking-tight"
          >
            Join Us
          </Link>
        </div>
      </div>
    </main>
  );
}
