import express from "express";
import { AuthController } from "./auth.controller.js";
import { validate } from "../../middleware/validation.middleware.js";
import { signupSchema, loginSchema, resendSchema, verifySchema} from "./auth.validation.js";

const router = express.Router();

router.post("/signup", validate(signupSchema), AuthController.signup);

router.post("/login", validate(loginSchema), AuthController.login);

router.post("/resend", validate(resendSchema), AuthController.resendOTP);

router.post("/verify", validate(verifySchema), AuthController.verify);

export default router;