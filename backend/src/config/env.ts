import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const envSchema = z.object({
  PORT: z.coerce.number().default(5000),
  DATABASE_URL: z.string().min(1),
  JWT_SECRET: z.string().min(10),
  JWT_EXPIRES_IN: z.string().default('1d'),
  OTP_EXPIRY_MINUTES: z.coerce.number().default(5),
  OTP_RESEND_COOLDOWN: z.coerce.number().default(30),
  RESEND_API_KEY: z.string().min(1),
  EMAIL_FROM: z.string().default("no-reply@kunjo.com"),
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  console.error('❌ Invalid Environment Variables:', _env.error.format());
  process.exit(1);
}

export const env = _env.data;