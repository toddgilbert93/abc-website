import Link from "next/link";
import Image from "next/image";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-black">
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
      <div className="mx-auto max-w-2xl px-6 pt-[12vh] pb-24">
        <h1 className="animate-fade-in-up font-[family-name:var(--font-geist-mono)] text-lg font-medium leading-snug tracking-tight text-white/85 sm:text-xl">
          The future is uncertain.
          <br />
          Your role is unwritten.
        </h1>

        <div className="animate-fade-in-up animation-delay-300 mt-10 space-y-6 font-[family-name:var(--font-geist-mono)] text-sm font-light leading-relaxed tracking-wide text-white/60">
          <p>
            Austin Build Club is a space for local talent to collaborate,
            create, and bond. Whether you are an experienced developer shipping
            complex systems, or a product marketer experimenting with process
            automation, we believe that everyone has something to offer, and
            none of us are ok without improving.
          </p>

          <p>
            There are two requirements to be a part of this community. One, you
            must live in Austin. And two, you must be always actively building
            something. Personal websites are fine, throwaway tools are great,
            crazy concepts that fail are amazing.
          </p>

          <p>
            If this gets you excited, we look forward to meeting you :)
          </p>
        </div>

        <div className="animate-fade-in-up animation-delay-600 mt-10">
          <Link
            href="/join"
            className="inline-block border border-white/30 bg-white/10 px-8 py-3 font-[family-name:var(--font-geist-mono)] text-xs font-medium uppercase tracking-[0.2em] text-white backdrop-blur-sm transition-all duration-300 hover:border-white/60 hover:bg-white/20"
          >
            Join Us
          </Link>
        </div>
      </div>
    </main>
  );
}
