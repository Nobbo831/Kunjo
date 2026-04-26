import { resend } from "../config/resend.js";
import { env } from "../config/env.js";

export async function sendOTPEmail(email: string, otp: string) {
  try {
    const result = await resend.emails.send({
      from: env.EMAIL_FROM,
      to: email,
      subject: "Your OTP Verification Code",
      html: `
        <div style="font-family: Arial;">
          <h2>OTP Verification</h2>
          <p>Your code is:</p>

          <h1 style="letter-spacing: 6px;">
            ${otp}
          </h1>

          <p>This code expires in ${env.OTP_EXPIRY_MINUTES} minutes.</p>
        </div>
      `,
    });

    console.log("📧 Email sent:", result);
    return result;
  } catch (error) {
    console.error("❌ Email failed:", error);
    return null;
  }
}