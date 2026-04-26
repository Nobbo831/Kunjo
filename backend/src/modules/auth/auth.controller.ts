import { AuthService } from "./auth.service.js";

export class AuthController {
  
  // 🟢 SIGNUP
  static async signup(req: any, res: any) {
    try {
      const result = await AuthService.signup(req.body);
      res.status(201).json(result);
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  }

  // 🔁 RESEND OTP
  static async resendOTP(req: any, res: any) {
    try {
      const result = await AuthService.resendOTP(req.body.email);
      res.status(200).json(result);
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  }

  // ✅ VERIFY OTP
  static async verify(req: any, res: any) {
    try {
      const { email, otp } = req.body;
      const result = await AuthService.verify(email, otp);
      res.status(200).json(result);
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  }

  // 🔑 LOGIN
  static async login(req: any, res: any) {
    try {
      const result = await AuthService.login(
        req.body.email,
        req.body.password
      );
      res.status(200).json(result);
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  }
}