import { z } from "zod";

// 🟢 Signup
export const signupSchema = z.object({
  email: z.email(),
  password: z.string().min(6),
  name: z.string().min(2),
  dob: z.string(),
  gender: z.string(),
  address: z.string(),
  phone: z.string(),
  dept_name: z.string(),
  regi_no: z.string(),
});

// 🔑 Login
export const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(6),
});

// 🔁 Resend OTP
export const resendSchema = z.object({
  email: z.email(),
});

// ✅ Verify OTP
export const verifySchema = z.object({
  email: z.email(),
  otp: z.string().length(4),
});