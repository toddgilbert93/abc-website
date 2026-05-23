"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export interface ContactResult {
  success: boolean;
  error?: string;
}

export async function sendContactMessage(data: {
  name: string;
  message: string;
}): Promise<ContactResult> {
  if (!data.name.trim()) {
    return { success: false, error: "Name is required." };
  }
  if (!data.message.trim()) {
    return { success: false, error: "Message is required." };
  }

  try {
    await resend.emails.send({
      from: "Austin Build Club <onboarding@resend.dev>",
      to: "toddgilbert93@gmail.com",
      subject: `ABC Contact: ${data.name.trim()}`,
      html: `
        <h2>New contact message</h2>
        <p><strong>Name:</strong> ${data.name.trim()}</p>
        <p><strong>Message:</strong></p>
        <p>${data.message.trim().replace(/\n/g, "<br />")}</p>
      `,
    });
  } catch (error) {
    console.error("Failed to send contact email:", error);
    return { success: false, error: "Failed to send message. Please try again." };
  }

  return { success: true };
}
