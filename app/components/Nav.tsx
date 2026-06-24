import Link from "next/link";
import Image from "next/image";

export default function Nav() {
  return (
    <nav className="relative z-20 flex items-center justify-between px-6 py-4 sm:px-10">
      <Link
        href="/"
        className="block transition-transform duration-200 hover:scale-110 hover:-rotate-3"
      >
        <Image src="/logo2.svg" alt="ABC" width={44} height={44} priority />
      </Link>
      <div className="flex items-center gap-6 text-sm font-bold">
        <Link
          href="/about"
          className="text-accent-cyan transition-colors duration-200 hover:text-[#05a3bf]"
        >
          About
        </Link>
        <Link
          href="/contact"
          className="text-accent-coral transition-colors duration-200 hover:text-[#d6555a]"
        >
          Contact
        </Link>
      </div>
    </nav>
  );
}
