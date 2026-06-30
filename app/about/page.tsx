import Nav from "../components/Nav";
import { AccentBlob, LegoButton } from "../components/ui";
import AboutPhotoStack from "./AboutPhotoStack";

export default function AboutPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-background">
      <AccentBlob color="green" className="-right-20 top-40 -z-0" />

      <Nav />

      <div className="relative z-10 mx-auto max-w-2xl px-6 pt-[8vh] pb-24">
        <AboutPhotoStack />

        <h1 className="animate-fade-in-up text-lg font-medium leading-snug tracking-tight text-foreground sm:text-xl">
          We are builders
        </h1>

        <p className="animate-fade-in-up animation-delay-300 mt-5 text-sm font-light leading-relaxed tracking-wide text-foreground/70">
          Austin Build Club is a space for experimenting, connecting, and having
          fun. We do not believe AI is good or bad, but rather a powerful tool
          when used responsibly.
        </p>

        <div className="animate-fade-in-up animation-delay-600 mt-10">
          <LegoButton
            href="/join"
            variant="green"
                       className="-rotate-3 text-sm font-bold tracking-tight"
          >
            Join Us
          </LegoButton>
        </div>
      </div>
    </main>
  );
}
