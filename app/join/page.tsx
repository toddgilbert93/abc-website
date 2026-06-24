"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { submitMember } from "./actions";

interface FormData {
  fullName: string;
  email: string;
  linkedin: string;
  livesInAustin: boolean;
  interests: string[];
  aiExperience: string;
  weeklyTime: string;
  currentProject: string;
}

const INTEREST_OPTIONS = [
  { value: "business", label: "Solving business problems" },
  { value: "creative", label: "Creative software" },
  { value: "research", label: "Research & experimentation" },
  { value: "automation", label: "Automating workflows" },
];

const EXPERIENCE_OPTIONS = [
  {
    value: "ships-regularly",
    label: "I regularly build and ship AI-powered software",
  },
  {
    value: "prototypes",
    label: "I've built simple apps and prototypes with AI tools",
  },
  { value: "learning", label: "I'm actively learning and experimenting" },
  { value: "new", label: "I'm new but excited to start building" },
];

const TIME_OPTIONS = [
  { value: "15-plus", label: "15+ hrs/week", tag: "serious builder" },
  { value: "5-15", label: "5–15 hrs/week", tag: "active explorer" },
  { value: "1-5", label: "1–5 hrs/week", tag: "casually building" },
  { value: "under-1", label: "<1 hr/week", tag: "here for the vibes" },
];

const TOTAL_STEPS = 5;

const STEP_SEGMENT_COLORS = [
  "bg-accent-cyan",
  "bg-accent-coral",
  "bg-accent-green",
  "bg-accent-cyan",
  "bg-accent-coral",
] as const;

const optionClass = (selected: boolean) =>
  `w-full rounded-xl border-2 px-4 py-3 text-left text-sm transition-all duration-200 ${
    selected
      ? "border-accent-cyan bg-accent-cyan/10 text-foreground"
      : "border-black/10 bg-white text-foreground/70 hover:border-accent-cyan/50 hover:scale-[1.01]"
  }`;

const inputClass =
  "w-full rounded-xl border-2 border-black/10 bg-white px-4 py-3 text-sm text-foreground transition-colors placeholder:text-black/30 focus:border-accent-cyan focus:outline-none focus:ring-2 focus:ring-accent-cyan/30";

const primaryButtonClass =
  "lego lego-green text-xs font-bold uppercase tracking-[0.2em]";

export default function JoinPage() {
  const [step, setStep] = useState(1);
  const [isPending, startTransition] = useTransition();
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    linkedin: "",
    livesInAustin: false,
    interests: [],
    aiExperience: "",
    weeklyTime: "",
    currentProject: "",
  });

  const validateStep = (currentStep: number): boolean => {
    switch (currentStep) {
      case 1:
        return (
          formData.fullName.trim() !== "" && formData.email.trim() !== ""
        );
      case 2:
        return formData.interests.length > 0;
      case 3:
        return formData.aiExperience !== "";
      case 4:
        return formData.weeklyTime !== "";
      case 5:
        return true;
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (!validateStep(step)) return;
    setStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setStep((prev) => prev - 1);
  };

  const handleSubmit = () => {
    setSubmitError(null);
    startTransition(async () => {
      const result = await submitMember(formData);
      if (result.success) {
        setStep(6);
      } else {
        setSubmitError(result.error ?? "Something went wrong.");
      }
    });
  };

  const toggleInterest = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.includes(value)
        ? prev.interests.filter((v) => v !== value)
        : [...prev.interests, value],
    }));
  };

  // Thank-you screen
  if (step === 6) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background px-6">
        <div className="animate-fade-in-up max-w-md text-center">
          <h1 className="text-xl font-medium tracking-tight text-foreground">
            You&apos;re in.
          </h1>
          <p className="mt-4 text-sm font-light tracking-wide text-foreground/60">
            Thanks for joining Austin Build Club. We&apos;ll be in touch soon.
          </p>
          <div className="animate-fade-in-up animation-delay-600 mt-8">
            <Link
              href="/"
              className="lego lego-cyan text-xs font-bold uppercase tracking-[0.2em]"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="w-full max-w-xl">
        {/* Stepper */}
        <p className="mb-3 text-xs uppercase tracking-[0.2em] text-foreground/40">
          Step {step} of {TOTAL_STEPS}
        </p>
        <div className="mb-10 flex gap-1.5">
          {STEP_SEGMENT_COLORS.map((color, index) => {
            const segmentStep = index + 1;
            const isFilled = step >= segmentStep;

            return (
              <div
                key={segmentStep}
                className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${
                  isFilled ? color : "bg-black/10"
                }`}
              />
            );
          })}
        </div>

        {/* Step content */}
        <div key={step} className="animate-step-enter">
          {step === 1 && (
            <div>
              <h2 className="text-lg font-medium tracking-tight text-foreground">
                Basic Information
              </h2>
              <div className="mt-8 space-y-6">
                <div>
                  <label className="mb-2 block text-xs uppercase tracking-widest text-foreground/50">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        fullName: e.target.value,
                      }))
                    }
                    className={inputClass}
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-xs uppercase tracking-widest text-foreground/50">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }))
                    }
                    className={inputClass}
                    placeholder="you@example.com"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-xs uppercase tracking-widest text-foreground/50">
                    LinkedIn
                  </label>
                  <input
                    type="url"
                    value={formData.linkedin}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        linkedin: e.target.value,
                      }))
                    }
                    className={inputClass}
                    placeholder="linkedin.com/in/yourprofile"
                  />
                </div>
                <label className="flex cursor-pointer items-center gap-3">
                  <div
                    className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 transition-colors ${
                      formData.livesInAustin
                        ? "border-accent-green bg-accent-green"
                        : "border-black/20 bg-white"
                    }`}
                  >
                    {formData.livesInAustin && (
                      <span className="text-xs font-bold text-[#0a1014]">✓</span>
                    )}
                  </div>
                  <input
                    type="checkbox"
                    checked={formData.livesInAustin}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        livesInAustin: e.target.checked,
                      }))
                    }
                    className="hidden"
                  />
                  <span className="text-sm text-foreground/70">
                    I currently live in the Austin Texas Metropolitan Area
                  </span>
                </label>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="text-lg font-medium tracking-tight text-foreground">
                What kinds of problems are you most interested in?
              </h2>
              <p className="mt-2 text-xs tracking-wide text-foreground/40">
                Select all that apply.
              </p>
              <div className="mt-8 space-y-3">
                {INTEREST_OPTIONS.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => toggleInterest(option.value)}
                    className={optionClass(
                      formData.interests.includes(option.value)
                    )}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 className="text-lg font-medium tracking-tight text-foreground">
                What&apos;s your experience building with AI tools?
              </h2>
              <p className="mt-2 text-xs tracking-wide text-foreground/40">
                Select the option that best describes you.
              </p>
              <div className="mt-8 space-y-3">
                {EXPERIENCE_OPTIONS.map((option) => (
                  <button
                    key={option.value}
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        aiExperience: option.value,
                      }))
                    }
                    className={optionClass(
                      formData.aiExperience === option.value
                    )}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 4 && (
            <div>
              <h2 className="text-lg font-medium tracking-tight text-foreground">
                How much time can you realistically dedicate to building each
                week?
              </h2>
              <div className="mt-8 space-y-3">
                {TIME_OPTIONS.map((option) => (
                  <button
                    key={option.value}
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        weeklyTime: option.value,
                      }))
                    }
                    className={optionClass(formData.weeklyTime === option.value)}
                  >
                    {option.label}{" "}
                    <span className="text-foreground/40">({option.tag})</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 5 && (
            <div>
              <h2 className="text-lg font-medium tracking-tight text-foreground">
                What are you trying to build or understand right now?
              </h2>
              <div className="mt-8">
                <textarea
                  value={formData.currentProject}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      currentProject: e.target.value,
                    }))
                  }
                  rows={5}
                  className={`${inputClass} resize-none`}
                  placeholder="Tell us what you're working on..."
                />
              </div>
            </div>
          )}
        </div>

        {/* Error message */}
        {submitError && (
          <div className="mt-4 rounded-xl border border-accent-coral/40 bg-accent-coral/10 px-4 py-3 text-sm text-[#b3373c]">
            {submitError}
          </div>
        )}

        {/* Navigation */}
        <div className="mt-10 flex items-center justify-between">
          {step > 1 ? (
            <button
              onClick={handleBack}
              className="text-xs uppercase tracking-[0.15em] text-foreground/40 transition-colors hover:text-accent-coral"
            >
              Back
            </button>
          ) : (
            <div />
          )}
          {step < TOTAL_STEPS ? (
            <button onClick={handleNext} className={primaryButtonClass}>
              Next
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={isPending}
              className={primaryButtonClass}
            >
              {isPending ? "Submitting..." : "Submit"}
            </button>
          )}
        </div>
      </div>
    </main>
  );
}
