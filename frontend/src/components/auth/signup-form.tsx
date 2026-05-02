"use client";

import React, { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { RippleButton } from "@/components/ui/ripple-button";
import { Field } from "./field";
import { DatePicker } from "@/components/ui/date-picker";
import {
  MailIcon,
  PasswordIcon,
  LocationIcon,
  BookIcon,
  HashIcon,
  BackIcon,
  EyeIcon,
  SuccessIcon,
} from "../ui/icons";
import { useSignup, useOtpVerify } from "@/lib/auth.hooks";
import { ShineBorder } from "@/components/ui/shine-border";
import { cn } from "@/lib/utils";

type AuthStep = "step1" | "step2" | "step3" | "otp";

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

function AuthCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative overflow-hidden rounded-[28px] bg-white shadow-[0_30px_80px_rgba(15,23,42,0.12)] ring-1 ring-emerald-100">
      <ShineBorder borderWidth={1} duration={14} shineColor={["#22c55e", "#8ba316", "#d9de4a"]} />
      <div className="relative z-10 p-6 sm:p-8">{children}</div>
    </div>
  );
}

function StepChip({ active, stepNumber }: { active: boolean; stepNumber: number }) {
  return (
      <span className={cn("flex h-5 w-5 items-center justify-center rounded-full text-[11px]", active ? "bg-emerald-600 text-white" : "bg-slate-200 text-slate-600")}>{stepNumber}</span>
  );
}

export function SignupForm({ onSwitch }: SignupFormProps) {
  const router = useRouter();
  const [step, setStep] = useState<AuthStep>("step1");
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
  const [stepError, setStepError] = useState("");
  const { signup, loading: signupLoading, error: signupError, success: signupSuccess } = useSignup();
  const { verify, loading: verifyLoading, error: verifyError, success: verifySuccess, setError: setVerifyError, setSuccess: setVerifySuccess } = useOtpVerify();

  const upd = (key: keyof SignupPayload, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const goToStep = (nextStep: AuthStep) => {
    setStepError("");
    setStep(nextStep);
  };

  const handleStepOneSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.dob) {
      setStepError("Please select your date of birth.");
      return;
    }

    setStepError("");
    setStep("step2");
  };

  const handleStepTwoSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setStepError("");
    setStep("step3");
  };

  const handleSignupSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setStepError("");
    const data = await signup(form as unknown as Record<string, string>);
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
    setStep("step3");
    setVerifyError("");
    setVerifySuccess("");
  };

  const selectClassName = cn(
    "h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-900 outline-none transition",
    "focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/15"
  );

  const stepOrder: Array<{ key: Exclude<AuthStep, "otp">; number: number }> = [
    { key: "step1", number: 1 },
    { key: "step2", number: 2 },
    { key: "step3", number: 3 },
  ];

  if (step === "otp") {
    return (
      <AuthCard>
        <div className="space-y-6">
          <button
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-slate-900"
            type="button"
            onClick={resetAndGoBack}
          >
            <BackIcon /> Back to account details
          </button>

          <div className="space-y-2">
            <h2 className="text-2xl font-extrabold tracking-tight text-slate-950">Verify OTP</h2>
            <p className="text-sm leading-6 text-slate-500">
              Enter the 4-digit OTP sent to <strong className="text-emerald-600">{form.email}</strong>
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleVerifyOtp}>
            <div className="space-y-1.5">
              <label htmlFor="otp" className="text-xs font-semibold uppercase tracking-[0.08em] text-slate-600">
                4-digit OTP
              </label>
              <input
                id="otp"
                className="h-14 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-center text-2xl font-semibold tracking-[0.6em] text-slate-900 outline-none transition placeholder:text-slate-300 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/15"
                type="text"
                inputMode="numeric"
                maxLength={4}
                value={otp}
                placeholder="••••"
                required
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 4))}
              />
            </div>

            {verifyError && <p className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">{verifyError}</p>}
            {verifySuccess && (
              <p className="flex items-center gap-2 text-sm text-emerald-600">
                <SuccessIcon />
                <span>{verifySuccess}</span>
              </p>
            )}

            <RippleButton
              type="submit"
              disabled={verifyLoading}
              className="h-11 w-full rounded-xl border-0 bg-emerald-600 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(34,197,94,0.25)] transition hover:bg-emerald-500 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {verifyLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  Verifying…
                </span>
              ) : (
                "Verify OTP"
              )}
            </RippleButton>
          </form>
        </div>
      </AuthCard>
    );
  }

  return (
    <AuthCard>
      <div className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-extrabold tracking-tight text-slate-950">Create Account</h2>
          <p className="text-sm leading-6 text-slate-500">Complete the form in 3 short steps. OTP is sent after step 3.</p>
        </div>

        <div className="flex flex-wrap gap-2">
          {stepOrder.map((item) => (
            <StepChip key={item.key} active={step === item.key} stepNumber={item.number} />
          ))}
        </div>

        {stepError && <p className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">{stepError}</p>}

        {step === "step1" && (
          <form className="space-y-4" onSubmit={handleStepOneSubmit}>
            <div className="grid gap-4 md:grid-cols-2">
              <Field
                label="Full Name"
                id="s-name"
                // icon={<ProfileIcon />}
                value={form.name}
                onChange={(v) => upd("name", v)}
                placeholder="John Doe"
                required
              />
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-[0.08em] text-slate-600">Date of Birth</label>
                <DatePicker value={form.dob} onValueChange={(v) => upd("dob", v)} placeholder="Select your birth date" />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-1.5">
                <label htmlFor="s-gender" className="text-xs font-semibold uppercase tracking-[0.08em] text-slate-600">
                  Gender
                </label>
                <select
                  id="s-gender"
                  value={form.gender}
                  onChange={(e) => upd("gender", e.target.value)}
                  className={selectClassName}
                  required
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <Field
                label="Address"
                id="s-address"
                icon={<LocationIcon />}
                value={form.address}
                onChange={(v) => upd("address", v)}
                placeholder="Sylhet"
                required
              />
            </div>

            <div className="flex items-center justify-between gap-3 pt-2">
              <RippleButton
                type="button"
                className="h-11 rounded-xl border border-emerald-200 bg-emerald-50 px-5 text-sm font-semibold text-emerald-700 shadow-none transition hover:bg-emerald-100"
                onClick={onSwitch}
              >
                <span className="mr-2 inline-flex align-middle">
                  <BackIcon />
                </span>
                Back
              </RippleButton>
              <p className="text-sm text-slate-500">Step 1 of 3</p>
              <RippleButton
                type="submit"
                className="h-11 rounded-xl border-0 bg-emerald-600 px-5 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(34,197,94,0.25)] transition hover:bg-emerald-500"
              >
                Next
              </RippleButton>
            </div>
          </form>
        )}

        {step === "step2" && (
          <form className="space-y-4" onSubmit={handleStepTwoSubmit}>
            <div className="grid gap-4 md:grid-cols-2">
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

            <div className="flex items-center justify-between gap-3 pt-2">
              <RippleButton
                type="button"
                className="h-11 rounded-xl border border-emerald-200 bg-emerald-50 px-5 text-sm font-semibold text-emerald-700 shadow-none transition hover:bg-emerald-100"
                onClick={() => goToStep("step1")}
              >
                <span className="mr-2 inline-flex align-middle">
                  <BackIcon />
                </span>
                Back
              </RippleButton>
              <p className="text-sm text-slate-500">Step 2 of 3</p>
              <RippleButton
                type="submit"
                className="h-11 rounded-xl border-0 bg-emerald-600 px-5 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(34,197,94,0.25)] transition hover:bg-emerald-500"
              >
                Next
              </RippleButton>
            </div>
          </form>
        )}

        {step === "step3" && (
          <form className="space-y-4" onSubmit={handleSignupSubmit}>
            <div className="grid gap-4 md:grid-cols-2">
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
              <Field
                label="Password"
                id="s-password"
                icon={<PasswordIcon />}
                type={showPw ? "text" : "password"}
                value={form.password}
                onChange={(v) => upd("password", v)}
                placeholder="At least 6 characters"
                minLength={6}
                required
                trail={
                  <button
                    type="button"
                    className="rounded-md p-1 text-slate-400 transition hover:text-slate-600"
                    onClick={() => setShowPw((p) => !p)}
                  >
                    <EyeIcon off={showPw} />
                  </button>
                }
              />
            </div>

            {signupError && <p className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">{signupError}</p>}
            {signupSuccess && (
              <p className="flex items-center gap-2 text-sm text-emerald-600">
                <SuccessIcon />
                <span>{signupSuccess}</span>
              </p>
            )}

            <div className="flex items-center justify-between gap-3 pt-2">
              <RippleButton
                type="button"
                className="h-11 rounded-xl border border-emerald-200 bg-emerald-50 px-5 text-sm font-semibold text-emerald-700 shadow-none transition hover:bg-emerald-100"
                onClick={() => goToStep("step2")}
              >
                <span className="mr-2 inline-flex align-middle">
                  <BackIcon />
                </span>
                Back
              </RippleButton>
              <p className="text-sm text-slate-500">Step 3 of 3</p>
              <RippleButton
                type="submit"
                disabled={signupLoading}
                className="h-11 rounded-xl border-0 bg-emerald-600 px-5 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(34,197,94,0.25)] transition hover:bg-emerald-500 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {signupLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Sending OTP…
                  </span>
                ) : (
                  "Create Account"
                )}
              </RippleButton>
            </div>
          </form>
        )}

        <p className="text-center text-sm text-slate-500">
          Already have an account?{" "}
          <button type="button" className="font-semibold text-emerald-600 underline-offset-4 hover:underline" onClick={onSwitch}>
            Sign in
          </button>
        </p>
      </div>
    </AuthCard>
  );
}
