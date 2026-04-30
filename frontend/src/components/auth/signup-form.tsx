"use client";

import React, { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { RippleButton } from "@/components/ui/ripple-button";
import { Field } from "./field";
import { DatePicker } from "@/components/ui/date-picker";
import {
  MailIcon,
  LockIcon,
  UserIcon,
  PhoneIcon,
  MapPinIcon,
  BookIcon,
  HashIcon,
  BackIcon,
  EyeIcon,
} from "./icons";
import { useSignup, useOtpVerify } from "@/lib/auth.hooks";

type AuthStep = "signup" | "otp";

export interface SignupPayload {
  email: string;
  password: string;
  name: string;
  dob: string;
  gender: string;
  address: string;
  phone: string;
  dept_name: string;
  regi_no: string;
}

interface SignupFormProps {
  onSwitch: () => void;
}

export function SignupForm({ onSwitch }: SignupFormProps) {
  const router = useRouter();
  const [step, setStep] = useState<AuthStep>("signup");
  const [form, setForm] = useState<SignupPayload>({
    email: "",
    password: "",
    name: "",
    dob: "",
    gender: "male",
    address: "",
    phone: "",
    dept_name: "",
    regi_no: "",
  });

  const [showPw, setShowPw] = useState(false);
  const [otp, setOtp] = useState("");
  const { signup, loading: signupLoading, error: signupError, success: signupSuccess, setError: setSignupError, setSuccess: setSignupSuccess } = useSignup();
  const { verify, loading: verifyLoading, error: verifyError, success: verifySuccess, setError: setVerifyError, setSuccess: setVerifySuccess } = useOtpVerify();

  const upd = (key: keyof SignupPayload, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSignupSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = await signup(form);
    if (data) {
      setStep("otp");
    }
  };

  const handleVerifyOtp = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = await verify(form.email, otp);
    if (data) {
      setTimeout(() => router.push("/"), 1000);
    }
  };

  const resetAndGoBack = () => {
    setStep("signup");
    setVerifyError("");
    setVerifySuccess("");
  };

  if (step === "otp") {
    return (
      <div className="lsf-panel">
        <button
          className="lsf-back"
          type="button"
          onClick={resetAndGoBack}
        >
          <BackIcon /> Back to signup
        </button>
        <div className="lsf-panel-head">
          <h2 className="lsf-panel-title">Verify OTP</h2>
          <p className="lsf-panel-sub">
            Enter the 4-digit OTP sent to <strong style={{ color: "#16a34a" }}>{form.email}</strong>
          </p>
        </div>
        <form className="lsf-form" onSubmit={handleVerifyOtp}>
          <div className="lsf-field">
            <label htmlFor="otp" className="lsf-label">
              4-digit OTP
            </label>
            <input
              id="otp"
              className="lsf-otp"
              type="text"
              inputMode="numeric"
              maxLength={4}
              value={otp}
              placeholder="• • • •"
              required
              onChange={(e) =>
                setOtp(e.target.value.replace(/\D/g, "").slice(0, 4))
              }
            />
          </div>
          {verifyError && <p className="lsf-msg lsf-err">{verifyError}</p>}
          {verifySuccess && <p className="lsf-msg lsf-ok">{verifySuccess}</p>}
          <RippleButton type="submit" disabled={verifyLoading} className="lsf-submit">
            {verifyLoading ? (
              <span className="lsf-loading">
                <span className="lsf-spin" />
                Verifying…
              </span>
            ) : (
              "Verify OTP"
            )}
          </RippleButton>
          <RippleButton
            type="button"
            className="lsf-submit lsf-submit-ghost"
            onClick={resetAndGoBack}
          >
            Edit Signup Info
          </RippleButton>
        </form>
      </div>
    );
  }

  return (
    <div className="lsf-panel">
      <div className="lsf-panel-head">
        <h2 className="lsf-panel-title">Create Account</h2>
        <p className="lsf-panel-sub">
          Fill all details and submit to receive a 4-digit OTP.
        </p>
      </div>
      <form className="lsf-form" onSubmit={handleSignupSubmit}>
        {/* Row 1: Name + Email */}
        <div className="lsf-row">
          <Field
            label="Full Name"
            id="s-name"
            icon={<UserIcon />}
            value={form.name}
            onChange={(v) => upd("name", v)}
            placeholder="John Doe"
            required
          />
          <Field
            label="Email"
            id="s-email"
            icon={<MailIcon />}
            type="email"
            value={form.email}
            onChange={(v) => upd("email", v)}
            placeholder="user@student.sust.edu"
            required
          />
        </div>

        {/* Row 2: Password + DOB */}
        <div className="lsf-row">
          <Field
            label="Password"
            id="s-password"
            icon={<LockIcon />}
            type={showPw ? "text" : "password"}
            value={form.password}
            onChange={(v) => upd("password", v)}
            placeholder="At least 6 characters"
            minLength={6}
            required
            trail={
              <button
                type="button"
                className="lsf-eye"
                onClick={() => setShowPw((p) => !p)}
              >
                <EyeIcon off={showPw} />
              </button>
            }
          />
          <div className="lsf-field">
            <label className="lsf-label">Date of Birth</label>
            <DatePicker
              value={form.dob}
              onValueChange={(v) => upd("dob", v)}
              placeholder="Select your birth date"
            />
          </div>
        </div>

        {/* Row 3: Gender + Phone */}
        <div className="lsf-row">
          <div className="lsf-field">
            <label htmlFor="s-gender" className="lsf-label">
              Gender
            </label>
            <select
              id="s-gender"
              value={form.gender}
              onChange={(e) => upd("gender", e.target.value)}
              className="lsf-select"
              required
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <Field
            label="Phone"
            id="s-phone"
            icon={<PhoneIcon />}
            type="tel"
            value={form.phone}
            onChange={(v) => upd("phone", v)}
            placeholder="01700000000"
            required
          />
        </div>

        {/* Row 4: Department + Registration */}
        <div className="lsf-row">
          <Field
            label="Department"
            id="s-dept"
            icon={<BookIcon />}
            value={form.dept_name}
            onChange={(v) => upd("dept_name", v)}
            placeholder="CSE"
            required
          />
          <Field
            label="Registration No"
            id="s-regi"
            icon={<HashIcon />}
            value={form.regi_no}
            onChange={(v) => upd("regi_no", v)}
            placeholder="2026-001"
            required
          />
        </div>

        {/* Full width: Address */}
        <Field
          label="Address"
          id="s-address"
          icon={<MapPinIcon />}
          value={form.address}
          onChange={(v) => upd("address", v)}
          placeholder="Sylhet"
          required
        />

        {signupError && <p className="lsf-msg lsf-err">{signupError}</p>}
        {signupSuccess && <p className="lsf-msg lsf-ok">{signupSuccess}</p>}

        <RippleButton type="submit" disabled={signupLoading} className="lsf-submit">
          {signupLoading ? (
            <span className="lsf-loading">
              <span className="lsf-spin" />
              Sending OTP…
            </span>
          ) : (
            "Create Account"
          )}
        </RippleButton>
        <p className="lsf-switch">
          Already have an account?{" "}
          <button type="button" className="lsf-switch-link" onClick={onSwitch}>
            Sign in
          </button>
        </p>
      </form>
    </div>
  );
}
