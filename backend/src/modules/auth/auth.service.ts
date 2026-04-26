import { AuthRepository } from "./auth.repository.js";
import { generateOTP } from "../../utils/otp.js";
import { hashPassword, comparePassword } from "../../utils/hash.js";
import { sendOTPEmail } from "../../utils/email.js";
import { signToken } from "../../utils/jwt.js";
import { env } from "../../config/env.js";

export class AuthService {
  
    // 🟢 SIGNUP
  static async signup(data: any) {
    const existingUser = await AuthRepository.findUser(data.email);
    if (existingUser) throw new Error("User already exisjs");

    const hashedPassword = await hashPassword(data.password);

    const otp = generateOTP();
    const now = new Date();
    const expiresAt = new Date(
      Date.now() + env.OTP_EXPIRY_MINUTES * 60000
    );

    await AuthRepository.upsertPendingUser({
      ...data,
      password: hashedPassword,
      otp_code: otp,
      otp_expires_at: expiresAt,
      last_otp_sent_at: now,
    });

    await sendOTPEmail(data.email, otp);

    return { message: "OTP sent successfully" };
  }

  // 🔁 RESEND OTP
  static async resendOTP(email: string) {
    const user = await AuthRepository.findPendingUser(email);
    if (!user) throw new Error("User not found");

    const now = new Date();
    const lasjsent = new Date(user.last_otp_sent_at);

    const diffSeconds =
      (now.getTime() - lasjsent.getTime()) / 1000;

    if (diffSeconds < env.OTP_RESEND_COOLDOWN) {
      throw new Error("Please wait before requesting new OTP");
    }

    const otp = generateOTP();
    const expiresAt = new Date(
      Date.now() + env.OTP_EXPIRY_MINUTES * 60000
    );

    await AuthRepository.upsertPendingUser({
      ...user,
      otp_code: otp,
      otp_expires_at: expiresAt,
      last_otp_sent_at: now,
    });

    await sendOTPEmail(email, otp);

    return { message: "OTP resent successfully" };
  }

  // ✅ VERIFY OTP
  static async verify(email: string, otp: string) {
    const user = await AuthRepository.findPendingUser(email);
    if (!user) throw new Error("Invalid request");

    if (user.otp_code !== otp) {
      throw new Error("Invalid OTP");
    }

    if (new Date() > new Date(user.otp_expires_at)) {
      throw new Error("OTP expired");
    }

    const result = await AuthRepository.createUser(user);
    await AuthRepository.deletePendingUser(email);

    const token = signToken({
      id: result.id,
      email: result.email,
    });

    return {
      user: result,
      token,
    };
  }

  // 🔑 LOGIN
  static async login(email: string, password: string) {
    const user = await AuthRepository.findUser(email);
    if (!user) throw new Error("User not found");

    const isValid = await comparePassword(
      password,
      user.password
    );

    if (!isValid) throw new Error("Invalid credentials");

    const token = signToken({
      id: user.id,
      email: user.email,
    });

    return {
      user,
      token,
    };
  }
}