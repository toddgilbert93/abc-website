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
  { value: "consumer", label: "Solving consumer problems", tag: "the builder" },
  { value: "business", label: "Solving business problems", tag: "the operator" },
  { value: "fun", label: "Making something fun", tag: "the creator" },
  {
    value: "research",
    label: "Research & experimentation",
    tag: "the explorer",
  },
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
      <main className="flex min-h-screen items-center justify-center bg-black px-6">
        <div className="animate-fade-in-up max-w-md text-center font-[family-name:var(--font-geist-mono)]">
          <h1 className="text-xl font-medium tracking-tight text-white/85">
            You&apos;re in.
          </h1>
          <p className="mt-4 text-sm font-light tracking-wide text-white/50">
            Thanks for joining Austin Build Club. We&apos;ll be in touch soon.
          </p>
          <div className="animate-fade-in-up animation-delay-600 mt-8">
            <Link
              href="/"
              className="inline-block border border-white/30 bg-white/10 px-8 py-3 text-xs font-medium uppercase tracking-[0.2em] text-white backdrop-blur-sm transition-all duration-300 hover:border-white/60 hover:bg-white/20"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-black px-6">
      <div className="w-full max-w-xl font-[family-name:var(--font-geist-mono)]">
        {/* Stepper */}
        <p className="mb-10 text-xs uppercase tracking-[0.2em] text-white/40">
          Step {step} of {TOTAL_STEPS}
        </p>

        {/* Step content */}
        <div key={step} className="animate-step-enter">
          {step === 1 && (
            <div>
              <h2 className="text-lg font-medium tracking-tight text-white/85">
                Basic Information
              </h2>
              <div className="mt-8 space-y-6">
                <div>
                  <label className="mb-2 block text-xs uppercase tracking-widest text-white/50">
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
                    className="w-full border border-white/20 bg-transparent px-4 py-3 text-sm text-white transition-colors placeholder:text-white/30 focus:border-white/50 focus:outline-none"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-xs uppercase tracking-widest text-white/50">
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
                    className="w-full border border-white/20 bg-transparent px-4 py-3 text-sm text-white transition-colors placeholder:text-white/30 focus:border-white/50 focus:outline-none"
                    placeholder="you@example.com"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-xs uppercase tracking-widest text-white/50">
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
                    className="w-full border border-white/20 bg-transparent px-4 py-3 text-sm text-white transition-colors placeholder:text-white/30 focus:border-white/50 focus:outline-none"
                    placeholder="linkedin.com/in/yourprofile"
                  />
                </div>
                <label className="flex cursor-pointer items-center gap-3">
                  <div
                    className={`flex h-5 w-5 shrink-0 items-center justify-center border transition-colors ${
                      formData.livesInAustin
                        ? "border-white/50 bg-white/10"
                        : "border-white/20 bg-transparent"
                    }`}
                  >
                    {formData.livesInAustin && (
                      <span className="text-xs text-white">✓</span>
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
                  <span className="text-sm text-white/60">
                    I currently live in the Austin Texas Metropolitan Area
                  </span>
                </label>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="text-lg font-medium tracking-tight text-white/85">
                What kinds of problems are you most interested in?
              </h2>
              <p className="mt-2 text-xs tracking-wide text-white/40">
                Select all that apply.
              </p>
              <div className="mt-8 space-y-3">
                {INTEREST_OPTIONS.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => toggleInterest(option.value)}
                    className={`w-full border px-4 py-3 text-left text-sm transition-all duration-200 ${
                      formData.interests.includes(option.value)
                        ? "border-white/50 bg-white/10 text-white"
                        : "border-white/15 bg-transparent text-white/70 hover:border-white/30"
                    }`}
                  >
                    {option.label}{" "}
                    <span className="text-white/40">({option.tag})</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 className="text-lg font-medium tracking-tight text-white/85">
                What&apos;s your experience building with AI tools?
              </h2>
              <p className="mt-2 text-xs tracking-wide text-white/40">
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
                    className={`w-full border px-4 py-3 text-left text-sm transition-all duration-200 ${
                      formData.aiExperience === option.value
                        ? "border-white/50 bg-white/10 text-white"
                        : "border-white/15 bg-transparent text-white/70 hover:border-white/30"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 4 && (
            <div>
              <h2 className="text-lg font-medium tracking-tight text-white/85">
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
                    className={`w-full border px-4 py-3 text-left text-sm transition-all duration-200 ${
                      formData.weeklyTime === option.value
                        ? "border-white/50 bg-white/10 text-white"
                        : "border-white/15 bg-transparent text-white/70 hover:border-white/30"
                    }`}
                  >
                    {option.label}{" "}
                    <span className="text-white/40">({option.tag})</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 5 && (
            <div>
              <h2 className="text-lg font-medium tracking-tight text-white/85">
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
                  className="w-full resize-none border border-white/20 bg-transparent px-4 py-3 text-sm text-white transition-colors placeholder:text-white/30 focus:border-white/50 focus:outline-none"
                  placeholder="Tell us what you're working on..."
                />
              </div>
            </div>
          )}
        </div>

        {/* Error message */}
        {submitError && (
          <div className="mt-4 border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
            {submitError}
          </div>
        )}

        {/* Navigation */}
        <div className="mt-10 flex items-center justify-between">
          {step > 1 ? (
            <button
              onClick={handleBack}
              className="text-xs uppercase tracking-[0.15em] text-white/40 transition-colors hover:text-white/70"
            >
              Back
            </button>
          ) : (
            <div />
          )}
          {step < TOTAL_STEPS ? (
            <button
              onClick={handleNext}
              className="border border-white/30 bg-white/10 px-8 py-3 text-xs font-medium uppercase tracking-[0.2em] text-white backdrop-blur-sm transition-all duration-300 hover:border-white/60 hover:bg-white/20"
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={isPending}
              className="border border-white/30 bg-white/10 px-8 py-3 text-xs font-medium uppercase tracking-[0.2em] text-white backdrop-blur-sm transition-all duration-300 hover:border-white/60 hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {isPending ? "Submitting..." : "Submit"}
            </button>
          )}
        </div>
      </div>
    </main>
  );
}
