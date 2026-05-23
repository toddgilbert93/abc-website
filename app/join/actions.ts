"use server";

import { supabase } from "@/lib/supabase";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface MemberFormData {
  fullName: string;
  email: string;
  linkedin: string;
  livesInAustin: boolean;
  interests: string[];
  aiExperience: string;
  weeklyTime: string;
  currentProject: string;
}

export interface SubmitResult {
  success: boolean;
  error?: string;
}

export async function submitMember(
  data: MemberFormData
): Promise<SubmitResult> {
  if (!data.fullName.trim()) {
    return { success: false, error: "Full name is required." };
  }
  if (!data.email.trim()) {
    return { success: false, error: "Email is required." };
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.email)) {
    return { success: false, error: "Invalid email format." };
  }
  if (data.interests.length === 0) {
    return { success: false, error: "Select at least one interest." };
  }
  const validInterests = ["consumer", "business", "fun", "research"];
  if (!data.interests.every((i) => validInterests.includes(i))) {
    return { success: false, error: "Invalid interest selection." };
  }
  const validExperience = ["ships-regularly", "prototypes", "learning", "new"];
  if (!validExperience.includes(data.aiExperience)) {
    return { success: false, error: "Invalid experience selection." };
  }
  const validTime = ["15-plus", "5-15", "1-5", "under-1"];
  if (!validTime.includes(data.weeklyTime)) {
    return { success: false, error: "Invalid time selection." };
  }

  const { error } = await supabase.from("members").insert({
    full_name: data.fullName.trim(),
    email: data.email.trim().toLowerCase(),
    linkedin: data.linkedin.trim() || null,
    lives_in_austin: data.livesInAustin,
    interests: data.interests,
    ai_experience: data.aiExperience,
    weekly_time: data.weeklyTime,
    current_project: data.currentProject.trim() || null,
  });

  if (error) {
    if (error.code === "23505") {
      return {
        success: false,
        error: "This email has already been registered.",
      };
    }
    console.error("Supabase insert error:", error);
    return { success: false, error: "Something went wrong. Please try again." };
  }

  // Send notification email (don't block the response on failure)
  try {
    await resend.emails.send({
      from: "Austin Build Club <onboarding@resend.dev>",
      to: "toddgilbert93@gmail.com",
      subject: `New ABC Member: ${data.fullName.trim()}`,
      html: `
        <h2>New member signup!</h2>
        <p><strong>Name:</strong> ${data.fullName.trim()}</p>
        <p><strong>Email:</strong> ${data.email.trim().toLowerCase()}</p>
        <p><strong>LinkedIn:</strong> ${data.linkedin.trim() || "Not provided"}</p>
        <p><strong>Lives in Austin:</strong> ${data.livesInAustin ? "Yes" : "No"}</p>
        <p><strong>Interests:</strong> ${data.interests.join(", ")}</p>
        <p><strong>AI Experience:</strong> ${data.aiExperience}</p>
        <p><strong>Weekly Time:</strong> ${data.weeklyTime}</p>
        <p><strong>Currently Building:</strong> ${data.currentProject.trim() || "Not provided"}</p>
      `,
    });
  } catch (emailError) {
    console.error("Failed to send notification email:", emailError);
  }

  return { success: true };
}
